"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArticleStatus } from "@prisma/client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createArticle, updateArticle } from "@/app/actions/articles";
import TiptapEditor from "@/components/editor/TiptapEditor";
import { SEOFields } from "./SEOFields";
import { Loader2, History } from "lucide-react";
import { format } from "date-fns";

const articleSchema = z.object({
  title: z.string().min(1, "Title is required"),
  slug: z.string().min(1, "Slug is required").regex(/^[a-z0-9-]+$/, "Slug must be lowercase alphanumeric and dashes"),
  summary: z.string().optional().nullable(),
  content: z.string().min(1, "Content is required"),
  coverImage: z.string().optional().nullable(),
  status: z.nativeEnum(ArticleStatus).default(ArticleStatus.DRAFT),
  categoryId: z.string().optional().nullable(),
  metaTitle: z.string().optional().nullable(),
  metaDescription: z.string().optional().nullable(),
  tags: z.array(z.string()).optional(),
  reviewNotes: z.string().optional().nullable(),
  guestAuthorName: z.string().optional().nullable(),
  guestAuthorBio: z.string().optional().nullable(),
  guestAuthorUrl: z.string().optional().nullable(),
  isFeatured: z.boolean().optional(),
});

type ArticleFormData = z.infer<typeof articleSchema>;

export default function ArticleForm({ initialData, categories, tags }: { initialData?: any; categories?: any[]; tags?: any[] }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm<ArticleFormData>({
    resolver: zodResolver(articleSchema as any),
    defaultValues: initialData
      ? {
          ...initialData,
          isFeatured: initialData.isFeatured ?? false,
        }
      : {
          status: ArticleStatus.DRAFT,
          tags: [],
          isFeatured: false,
        },
  });

  const content = watch("content");

  const onSubmit = async (data: ArticleFormData) => {
    setIsLoading(true);
    setError("");
    try {
      if (initialData?.id) {
        await updateArticle(initialData.id, data);
      } else {
        await createArticle(data);
      }
      router.push("/admin/articles");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {error && <div className="p-3 bg-red-100 text-red-600 rounded">{error}</div>}
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="md:col-span-2 space-y-6">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <input
              {...register("title")}
              className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Article title"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Content</label>
            <TiptapEditor value={content || ""} onChange={(val) => setValue("content", val)} />
            {errors.content && <p className="text-red-500 text-sm mt-1">{errors.content.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Summary</label>
            <textarea
              {...register("summary")}
              className="w-full flex min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder="Brief summary for listings"
            />
          </div>
          
          <SEOFields register={register} errors={errors} watch={watch} />
        </div>

        <div className="space-y-6">
          {/* Guest Contributor Provenance card */}
          {(initialData?.author || initialData?.promotionalUrl) && (
            <div className="p-4 border border-amber-300 dark:border-amber-800 rounded-xl bg-amber-50/70 dark:bg-amber-950/30 space-y-2.5">
              <h3 className="font-semibold text-sm text-amber-950 dark:text-amber-200">
                Guest Contributor Info
              </h3>
              <div className="text-xs space-y-1.5 text-amber-900 dark:text-amber-300">
                <p>
                  <strong>Author:</strong>{" "}
                  {initialData?.author?.contributorProfile?.fullName || initialData?.author?.name || "Guest Contributor"}
                </p>
                <p>
                  <strong>Email:</strong> {initialData?.author?.email || "N/A"}
                </p>
                {initialData?.author?.contributorProfile?.organization && (
                  <p>
                    <strong>Company:</strong> {initialData.author.contributorProfile.organization}
                  </p>
                )}
                {initialData?.author?.contributorProfile?.country && (
                  <p>
                    <strong>Country:</strong> {initialData.author.contributorProfile.country}
                  </p>
                )}
                {initialData?.promotionalUrl && (
                  <p>
                    <strong>Website / Promo:</strong>{" "}
                    <a
                      href={initialData.promotionalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary-text underline break-all font-semibold"
                    >
                      {initialData.promotionalUrl}
                    </a>
                  </p>
                )}
                {initialData?.originalSourceUrl && (
                  <p>
                    <strong>Original Source:</strong>{" "}
                    <a
                      href={initialData.originalSourceUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-brand-primary-text underline break-all font-semibold"
                    >
                      {initialData.originalSourceUrl}
                    </a>
                  </p>
                )}
                <p>
                  <strong>Origin:</strong> {initialData?.contentOrigin || "MANUAL"}
                </p>
              </div>
            </div>
          )}

          <div className="p-5 border border-border-default rounded-xl bg-surface space-y-4 shadow-xs">
            <h3 className="font-bold text-sm text-text-heading">Publishing &amp; Editorial Governance</h3>
            
            <div>
              <label className="block text-xs font-semibold text-text-heading mb-1.5">Status</label>
              <select
                {...register("status")}
                className="w-full flex h-11 rounded-lg border border-border-default bg-surface px-3 py-2 text-sm text-text-heading focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
              >
                {Object.values(ArticleStatus).map(s => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-lg border border-border-default bg-bg-surface-subtle">
              <div className="pr-2">
                <label htmlFor="isFeatured" className="block text-xs font-bold text-text-heading cursor-pointer">
                  Featured Article
                </label>
                <p className="text-[11px] text-text-muted">
                  Feature in the top hero showcase on homepage.
                </p>
              </div>
              <input
                id="isFeatured"
                type="checkbox"
                {...register("isFeatured")}
                className="w-4 h-4 rounded border-border-default text-brand-primary focus:ring-brand-primary cursor-pointer shrink-0"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-heading mb-1.5">
                Editorial Review Notes <span className="text-[11px] text-text-muted">(Feedback to Contributor)</span>
              </label>
              <textarea
                {...register("reviewNotes")}
                rows={3}
                className="w-full flex rounded-lg border border-border-default bg-surface p-3 text-sm text-text-heading placeholder:text-text-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary resize-none"
                placeholder="Required when requesting changes or leaving feedback for author..."
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full inline-flex items-center justify-center rounded-lg text-sm font-bold bg-primary hover:opacity-90 text-primary-foreground min-h-[44px] px-4 transition-all shadow-xs cursor-pointer"
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              Save &amp; Update Article
            </button>

            {initialData?.slug && (
              <a
                href={`/articles/${initialData.slug}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center rounded-lg text-xs font-semibold border border-border bg-card text-foreground hover:bg-muted min-h-[38px] px-3 transition-all shadow-xs cursor-pointer"
              >
                Preview Published Article &rarr;
              </a>
            )}
          </div>

          {/* Editorial Review Audit History */}
          {initialData?.editorialReviews && initialData.editorialReviews.length > 0 && (
            <div className="p-4 border rounded-xl bg-slate-50 dark:bg-slate-900/40 space-y-3">
              <div className="flex items-center gap-1.5 font-medium text-sm text-slate-800 dark:text-slate-200">
                <History className="w-4 h-4 text-slate-500" />
                <span>Editorial Audit History</span>
                <span className="text-xs text-muted-foreground ml-auto">
                  {initialData.editorialReviews.length} decision{initialData.editorialReviews.length > 1 ? "s" : ""}
                </span>
              </div>
              <div className="space-y-2.5 max-h-64 overflow-y-auto pr-1">
                {initialData.editorialReviews.map((rev: any) => (
                  <div
                    key={rev.id}
                    className="p-2.5 rounded-lg border bg-white dark:bg-slate-950 text-xs space-y-1 shadow-2xs"
                  >
                    <div className="flex items-center justify-between">
                      <span
                        className={`px-1.5 py-0.5 rounded font-semibold text-[10px] ${
                          rev.status === "PUBLISHED" || rev.status === "APPROVED"
                            ? "bg-green-100 text-green-800"
                            : rev.status === "CHANGES_REQUESTED"
                            ? "bg-orange-100 text-orange-800"
                            : rev.status === "REJECTED"
                            ? "bg-red-100 text-red-800"
                            : "bg-slate-100 text-slate-800"
                        }`}
                      >
                        {rev.status.replace("_", " ")}
                      </span>
                      <span className="text-[10px] text-muted-foreground">
                        {format(new Date(rev.createdAt), "MMM d, yyyy h:mm a")}
                      </span>
                    </div>
                    {rev.admin?.name && (
                      <p className="text-slate-500 text-[11px]">
                        Reviewer: {rev.admin.name} ({rev.admin.email})
                      </p>
                    )}
                    {rev.reviewNotes && (
                      <div className="p-1.5 bg-slate-50 dark:bg-slate-900 rounded border border-slate-100 dark:border-slate-800 text-slate-700 dark:text-slate-300 whitespace-pre-wrap">
                        {rev.reviewNotes}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="p-4 border rounded-md bg-muted/10 space-y-4">
            <h3 className="font-medium">Organization</h3>
            
            <div>
              <label className="block text-sm font-medium mb-1">Slug</label>
              <input
                {...register("slug")}
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="my-article-slug"
              />
              {errors.slug && <p className="text-red-500 text-sm mt-1">{errors.slug.message}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                {...register("categoryId")}
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
              >
                <option value="">None</option>
                {categories?.map(c => (
                  <option key={c.id} value={c.id}>{c.name}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Cover Image URL</label>
              <input
                {...register("coverImage")}
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                placeholder="https://..."
              />
            </div>
          </div>

          {/* Guest Author Attribution Panel */}
          <div className="p-4 border rounded-md bg-muted/10 space-y-4">
            <div>
              <h3 className="font-medium text-sm text-text-heading">Guest Author Attribution</h3>
              <p className="text-[11px] text-muted-foreground mt-0.5">
                Optional. Use when publishing an article contributed by an external guest author.
              </p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-heading mb-1">
                Guest Author Name
              </label>
              <input
                {...register("guestAuthorName")}
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="e.g. Jane Doe"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-heading mb-1">
                Author Biography
              </label>
              <textarea
                {...register("guestAuthorBio")}
                rows={3}
                className="w-full flex rounded-md border border-input bg-background p-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring resize-none"
                placeholder="Short professional biography..."
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-text-heading mb-1">
                Verified Profile URL
              </label>
              <input
                {...register("guestAuthorUrl")}
                type="url"
                className="w-full flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                placeholder="https://linkedin.com/in/janedoe"
              />
              <p className="text-[11px] text-muted-foreground mt-1">
                Approved LinkedIn, GitHub, or professional website.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}


