"use client";

import ClientPage from "@/pages/ClientPage";

interface Props {
  params: { id: string };
}
export default function ClintDAta({params}:Props) {
const { id } = params;
 

  if (!id) return <div>No ID provided in URL</div>;

  return (
    <div>
      <ClientPage params={{ id }} />
    </div>
  );
}

