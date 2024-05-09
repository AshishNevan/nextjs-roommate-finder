export default function userProfile({ params }: { params: { id: string } }) {
  return <div>Welcome User {params.id}</div>;
}
