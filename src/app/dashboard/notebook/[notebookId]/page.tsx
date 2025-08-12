import { PageWrapper } from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebooks";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Plus } from "lucide-react";
import NoteCard from "@/components/note-card";

type Params = Promise<{
  notebookId: string;
}>;

export default async function NotebookPage({ params }: { params: Params }) {
  const { notebookId } = await params;

  const { notebook } = await getNotebookById(notebookId);

  if (!notebook) {
    return (
      <PageWrapper
        breadcrumbs={[
          { label: "Dashboard", href: "/dashboard" },
          { label: "Notebook not found", href: "#" },
        ]}
      >
        <div className="flex flex-col items-center justify-center min-h-[400px]">
          <h1 className="text-2xl font-bold mb-4">Notebook not found</h1>
          <p className="text-muted-foreground mb-4">
            The notebook you&apos;re looking for doesn&apos;t exist.
          </p>
          <Link href="/dashboard">
            <Button>Back to Dashboard</Button>
          </Link>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: notebook.name, href: `/dashboard/notebook/${notebookId}` },
      ]}
    >
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold">{notebook.name}</h1>
        <Link href={`/dashboard/notebook/${notebookId}/note/new`}>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Create Note
          </Button>
        </Link>
      </div>

      <div className="space-y-4">
        {notebook.notes && notebook.notes.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {notebook.notes.map((note) => (
              <NoteCard key={note.id} note={note} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center min-h-[300px] text-center">
            <div className="mb-4">
              <Plus className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold mb-2">No notes yet</h3>
            <p className="text-muted-foreground mb-4">
              Create your first note to get started with this notebook.
            </p>
            <Link href={`/dashboard/notebook/${notebookId}/note/new`}>
              <Button>
                <Plus className="mr-2 h-4 w-4" />
                Create Note
              </Button>
            </Link>
          </div>
        )}
      </div>
    </PageWrapper>
  );
}
