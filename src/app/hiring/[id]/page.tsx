import { use } from "react";

interface Props {
  params: { id: string };
}

const TeamMemberPage = ({ params }: Props) => {
  const { id } = params;

  return <div>Team Member ID: {id}</div>;
};

export default TeamMemberPage;
