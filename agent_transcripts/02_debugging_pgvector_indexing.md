# Debugging pgvector Indexing

## Context
We are storing embeddings in PostgreSQL using the `pgvector` extension. Queries use the `<->` operator for similarity search. Indexing is critical for performance, especially as the dataset grows.

## Common Issues
1. **Index not created**
   - Symptom: Queries are slow even with small datasets.
   - Fix:
     ```sql
     CREATE INDEX ON embeddings USING ivfflat (vector vector_l2_ops) WITH (lists = 100);
     ```
     Ensure the index is created on the `vector` column.

2. **Wrong operator class**
   - Symptom: Error like `operator does not exist: vector <-> float[]`.
   - Fix: Use `vector_l2_ops` or `vector_cosine_ops` depending on similarity metric.

3. **Index not used**
   - Symptom: `EXPLAIN` shows sequential scan instead of index scan.
   - Fix:
     ```sql
     SET enable_seqscan = off;
     EXPLAIN SELECT * FROM embeddings ORDER BY vector <-> '[...]' LIMIT 5;
     ```
     If the index is ignored, check `lists` parameter and dataset size.

4. **Performance tuning**
   - Increase `lists` for larger datasets.
   - Use `ANALYZE embeddings;` after bulk inserts.
   - Consider `HNSW` index type if available in your pgvector version.

## Debugging Steps
1. Run `\dx` in `psql` to confirm `pgvector` is installed.
2. Check indexes:
   ```sql
   \di+ embeddings*
