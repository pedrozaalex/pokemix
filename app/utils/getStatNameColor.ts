const statNameColorMap: { [key: string]: string } = {
  hp: '#FF0000',
  attack: '#FF7F00',
  defense: '#FF7F00',
  'special-attack': '#FF7F00',
  'special-defense': '#FF7F00',
  speed: '#FF7F00',
};

export default function getStatNameColor(statName: string): string {
  return statNameColorMap[statName] ?? '#000000';
}
