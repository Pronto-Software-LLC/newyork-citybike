import { createServerFileRoute } from '@tanstack/react-start/server'
import { apiMiddleware } from '@/lib/auth'

// export const ServerRoute = createServerFileRoute('/api/demo-names')
//   .middleware([apiMiddleware as any])
//   .methods({
//     GET: async ({
//       request,
//       context,
//     }: {
//       request: any
//       context: { session: { user: { name: string } } }
//     }) => {
//       console.log('🚀 ~ context:', context)

//       return new Response(
//         JSON.stringify(['Alice', 'Bob', 'Charlie', context.session.user.name]),
//         {
//           headers: {
//             'Content-Type': 'application/json',
//           },
//         },
//       )
//     },
//   })

export const ServerRoute = createServerFileRoute('/api/demo-names').methods(
  (api) => ({
    GET: api.middleware([apiMiddleware]).handler(async ({ context }) => {
      // console.log('🚀 ~ context:', context)
      return new Response(
        JSON.stringify(['Alice', 'Bob', 'Charlie', context.session.user.name]),
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      )
    }),
  }),
)
