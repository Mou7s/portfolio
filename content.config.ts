import { defineCollection, defineContentConfig, z } from '@nuxt/content'

const createBaseSchema = () => z.object({
  title: z.string(),
  description: z.string()
})

const createSeoSchema = () => z.object({
  title: z.string(),
  description: z.string()
}).optional()

const createButtonSchema = () => z.object({
  label: z.string(),
  icon: z.string().optional(),
  to: z.string().optional(),
  color: z.enum(['primary', 'neutral', 'success', 'warning', 'error', 'info']).optional(),
  size: z.enum(['xs', 'sm', 'md', 'lg', 'xl']).optional(),
  variant: z.enum(['solid', 'outline', 'subtle', 'soft', 'ghost', 'link']).optional(),
  external: z.boolean().optional(),
  target: z.enum(['_blank', '_self']).optional()
})

export default defineContentConfig({
  collections: {
    index: defineCollection({
      type: 'page',
      source: '**/index.yml',
      schema: z.object({
        seo: createSeoSchema(),
        hero: z.object({
          links: z.array(createButtonSchema())
        }),
        about: createBaseSchema(),
        skills: z.object({
          title: z.string(),
          description: z.string(),
          items: z.array(z.object({
            name: z.string(),
            items: z.array(z.string())
          }))
        }).optional(),
        foundations: z.object({
          title: z.string(),
          description: z.string(),
          items: z.array(z.object({
            name: z.string(),
            repo: z.string(),
            tag: z.string(),
            summary: z.string(),
            highlights: z.array(z.string()),
            to: z.string()
          }))
        }).optional(),
        faq: createBaseSchema().extend({
          categories: z.array(
            z.object({
              title: z.string().nonempty(),
              questions: z.array(
                z.object({
                  label: z.string().nonempty(),
                  content: z.string().nonempty()
                })
              )
            })
          )
        })
      })
    }),
    projects: defineCollection({
      type: 'page',
      source: '**/projects/*.yml',
      schema: z.object({
        title: z.string().nonempty(),
        description: z.string().nonempty(),
        image: z.string().editor({ input: 'media' }).optional(),
        imageDark: z.string().optional(),
        url: z.string().optional(),
        repo: z.string().optional(),
        tags: z.array(z.string()),
        sort: z.number().optional()
      })
    }),
    pages: defineCollection({
      type: 'page',
      source: [
        { include: '**/projects.yml' }
      ],
      schema: z.object({
        seo: createSeoSchema(),
        links: z.array(createButtonSchema()).optional()
      })
    })
  }
})
