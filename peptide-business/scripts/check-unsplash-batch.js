const testIds = [
  "photo-1608248597359-56334a1a5116",
  "photo-1620916566398-39f1143ab7be",
  "photo-1556228720-195a672e8a03",
  "photo-1570172619644-dfd03ed5d881",
  "photo-1598440947619-2c35fc9aa908",
  "photo-1522337360788-8b13dee7a37e",
  "photo-1563178406-4cdc2923acbc",
  "photo-1532187863486-abf9dbad1b69",
  "photo-1571781926291-c477ebfd024b",
  "photo-1584308666744-24d5c474f2ae",
  "photo-1617897903246-719242758050",
  "photo-1527799820374-dcf8d9d4a388",
  "photo-1601049541289-9b1b7bbbfe19",
  "photo-1585751119414-ef2636f8aede",
  "photo-1576086213369-97a306d36557",
  "photo-1532094349884-543bc11b234d",
  "photo-1514733670139-4d87a1941d55",
  "photo-1581093458791-9f3c3900df4b",
  "photo-1582719478250-c89cae4dc85b",
  "photo-1616683693504-3ea7e9ad6fec",
  "photo-1617897903246-719242758050",
  "photo-1608248543803-ba4f8c70ae0b",
  "photo-1507652313519-d4e9174996dd",
  "photo-1612817288484-6f916006741a",
  "photo-1608571423902-eed4a5ad8108",
  "photo-1526947425960-945c6e72858f",
  "photo-1629732047847-50219e9c5aef",
  "photo-1513360309081-38f076278f1e"
];

async function run() {
  const valid = [];
  for (const id of testIds) {
    const url = `https://images.unsplash.com/${id}?auto=format&fit=crop&w=800&q=80`;
    try {
      const res = await fetch(url, { method: "HEAD" });
      if (res.status === 200) {
        valid.push(id);
        console.log(`[200 OK] ${id}`);
      } else {
        console.log(`[${res.status}] ${id}`);
      }
    } catch (e) {
      console.log(`[ERR] ${id}`);
    }
  }
  console.log("\nTOTAL VALID:", valid.length);
  console.log(JSON.stringify(valid, null, 2));
}

run();
