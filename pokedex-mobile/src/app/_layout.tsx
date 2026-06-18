import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Stack } from 'expo-router'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      retry: 2,
    },
  },
})

export default function RootLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <Stack>
        <Stack.Screen name="index" options={{ title: 'Pokédex', headerLargeTitle: true }} />
        <Stack.Screen name="pokemon/[id]" options={{ title: '', headerTransparent: true }} />
      </Stack>
    </QueryClientProvider>
  )
}
