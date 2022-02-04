const statMap: { [key: string]: string } = {
  hp: 'HP',
  attack: 'Atk',
  defense: 'Def',
  'special-attack': 'Sp. Atk',
  'special-defense': 'Sp. Def',
  speed: 'Speed',
};

export function formatStatName(stat: string): string {
  if (!statMap[stat]) {
    console.log('Unknown stat', stat);
    return stat;
  }

  return statMap[stat];
}
