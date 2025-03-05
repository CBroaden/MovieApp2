"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createPostAction } from "@/app/actions"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"

const formSchema = z.object({
  movie: z.string(),
  content: z.string().min(5, {
    message: "Content must be at least 5 characters.",
  }),
})

export default function PostForm({username}: {username: string}) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      movie: "",
      content: "",
    },
  })

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form action={createPostAction} className="space-y-2 my-4 lg:w-1/2  p-4 rounded-lg shadow shadow-zinc-700">
        <h1 className="text-center font-semibold">Create a Post</h1>
        <FormField
          control={form.control}
          name="movie"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Movie</FormLabel>
              <FormControl>
                <Input placeholder="Movie" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              {/*<FormLabel>Content</FormLabel>*/}
              <FormControl>
                <Textarea placeholder="What would you like to share" rows={4} className="resize-none" {...field} />
              </FormControl>
              <FormDescription>
                What would you like to share about the movie?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full " type="submit">Submit</Button>
      </form>
    </Form>
  )
}
