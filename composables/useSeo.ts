export const useSeo = ({ title, description, type = "website" }: { title: string; description?: string; type?: string }) => {
  useHead({
    title,
    meta: [
      { name: "description", content: description || "" },
      { property: "og:type", content: type },
      { property: "og:title", content: title },
      { property: "og:description", content: description || "" },
    ],
  })
}
