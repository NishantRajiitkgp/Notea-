"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { JSONContent } from "@tiptap/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import RichTextEditor from "@/components/rich-text-editor";
import { createNote } from "@/server/notes";

interface NewNoteFormProps {
  notebookId: string;
}

export default function NewNoteForm({ notebookId }: NewNoteFormProps) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<JSONContent[]>([]);
  const [isCreating, setIsCreating] = useState(false);
  const router = useRouter();

  const handleCreateNote = async () => {
    if (!title.trim()) {
      toast.error("Please enter a title for your note");
      return;
    }

    try {
      setIsCreating(true);
      const response = await createNote({
        title: title.trim(),
        content: content,
        notebookId: notebookId,
      });

      if (response.success && response.note) {
        toast.success("Note created successfully!");
        router.push(`/dashboard/notebook/${notebookId}/note/${response.note.id}`);
      } else {
        toast.error(response.message || "Failed to create note");
      }
    } catch (error) {
      toast.error("Failed to create note");
    } finally {
      setIsCreating(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="title">Title</Label>
        <Input
          id="title"
          placeholder="Enter note title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      <div className="space-y-2">
        <Label>Content</Label>
        <RichTextEditor
          content={content}
          onChange={setContent}
          placeholder="Start writing your note..."
        />
      </div>

      <div className="flex gap-2">
        <Button 
          onClick={handleCreateNote} 
          disabled={isCreating || !title.trim()}
        >
          {isCreating ? "Creating..." : "Create Note"}
        </Button>
        <Button 
          variant="outline" 
          onClick={() => router.back()}
          disabled={isCreating}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
