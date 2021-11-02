import {
  getDocs,
  limit,
  orderBy,
  query,
  QueryConstraint,
  startAt,
  where,
} from '@firebase/firestore';

/** Obtiene todos los documentos de una colección */
export async function queryAllDocs<Document>(
  ref: Parameters<typeof query>[0],
  params?: {
    orderBy?: string;
    startAt?: number;
    limit?: number;
    name?: string;
  },
) {
  let filters: QueryConstraint[] = [];

  if (params?.limit) filters.push(limit(params.limit));
  if (params?.startAt) filters.push(startAt(params.startAt));
  if (params?.orderBy) filters.push(orderBy(params.orderBy));
  if (params?.name) filters.push(where('name', '==', params.name));

  const qs = await getDocs(query(ref, ...filters));

  const res = qs.docs.map((doc) => ({
    id: doc.id,
    ...(doc.data() as Document),
  }));

  return res;
}
