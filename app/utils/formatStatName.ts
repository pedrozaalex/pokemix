const statMap: { [key: string]: string } = {
  hp: 'HP',
  attack: 'ATK',
  defense: 'DEF',
  'special-attack': 'SpA',
  'special-defense': 'SpD',
  speed: 'SPD',
};

export function formatStatName(stat: string): string {
  if (!statMap[stat]) {
    console.log('Unknown stat', stat);
    return stat;
  }

  return statMap[stat];
}
