import { StyleSheet, Text, View } from 'react-native'

const STAT_COLORS: Record<string, string> = {
  hp: '#FF5959',
  attack: '#F5AC78',
  defense: '#FAE078',
  'special-attack': '#9DB7F5',
  'special-defense': '#A7DB8D',
  speed: '#FA92B2',
}

type Props = {
  name: string
  value: number
  max?: number
}

export function StatBar({ name, value, max = 255 }: Props) {
  const percentage = Math.min((value / max) * 100, 100)
  const color = STAT_COLORS[name] ?? '#A8A878'

  return (
    <View style={styles.row}>
      <Text style={styles.name}>{name.replace('-', ' ')}</Text>
      <Text style={styles.value}>{value}</Text>
      <View style={styles.track}>
        <View style={[styles.fill, { width: `${percentage}%`, backgroundColor: color }]} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  name: {
    width: 110,
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  value: {
    width: 32,
    fontSize: 13,
    fontWeight: '600',
    textAlign: 'right',
    color: '#222',
  },
  track: {
    flex: 1,
    height: 8,
    backgroundColor: '#eee',
    borderRadius: 4,
    overflow: 'hidden',
  },
  fill: {
    height: '100%',
    borderRadius: 4,
  },
})
