import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Pokédex" }} />
      <Stack.Screen 
        name="pokemon/details/[id]" 
        options={{ 
            title: "Pokemon Details",
            headerBackButtonMenuDisplayMode: "minimal"
        }} />
    </Stack>
  );
}
