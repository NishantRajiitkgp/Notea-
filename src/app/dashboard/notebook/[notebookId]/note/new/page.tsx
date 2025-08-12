import { PageWrapper } from "@/components/page-wrapper";
import { getNotebookById } from "@/server/notebooks";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import NewNoteForm from "@/components/new-note-form";

type Params = Promise<{
  notebookId: string;
}>;

export default async function NewNotePage({ params }: { params: Params }) {
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
          <Button asChild>
            <a href="/dashboard">Back to Dashboard</a>
          </Button>
        </div>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper
      breadcrumbs={[
        { label: "Dashboard", href: "/dashboard" },
        { label: notebook.name, href: `/dashboard/notebook/${notebookId}` },
        { label: "New Note", href: `/dashboard/notebook/${notebookId}/note/new` },
      ]}
    >
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold">Create New Note</h1>
          <p className="text-muted-foreground">
            Add a new note to &quot;{notebook.name}&quot;
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Note Details</CardTitle>
          </CardHeader>
          <CardContent>
            <NewNoteForm notebookId={notebookId} />
          </CardContent>
        </Card>
      </div>
    </PageWrapper>
  );
}
