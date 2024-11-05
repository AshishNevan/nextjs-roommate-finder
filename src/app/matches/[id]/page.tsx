import { MatchData, getMatchesById } from "@/app/lib/matchActions";

export default async function usermatches({
  params,
}: {
  params: { id: string };
}) {
  const { data, error }: MatchData = await getMatchesById(params.id);
  if (error) {
    return <main>{error}</main>;
  }
  if (!data) {
    return <main>No matches</main>;
  }
  return (
    <main>
      {data.map((x) => (
        <div key={(x as any).id}>
          <pre>
            {[(x as any).id, " ", x.user_id, " ", x.listing_id, x.status]}
          </pre>
        </div>
      ))}
    </main>
  );
}
