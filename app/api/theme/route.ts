export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const mode = searchParams.get('mode') || 'light';

  const themes = {
    light: {
      background: '#fafdff',
      text: '#181b1c',
      title: '#3e4244',
      bar: '#07557c',
      border: '#d8dcde',
      'linechart-line': '#07557c',
      'linechart-underline': '#0d72a5',
      'linegradient-from': '#07557c',
      'linegradient-to': '#ebf5fa',
      'linegradient-under-from': '#93d5f5',
      'linegradient-under-to': '#ebf5fa',
      'card-bg': 'white',
      toggle: '#D8DCDE',
      button: '#FAFDFF',
    },
    dark: {
      background: '#6b6f71',
      text: '#ebebeb',
      title: '#d7d7d7',
      bar: '#0d72a5',
      border: '#6b6f71',
      'linechart-line': '#0d72a5',
      'linechart-underline': '#07557c',
      'linegradient-from': '#0d72a5',
      'linegradient-to': '#c4ebff',
      'linegradient-under-from': '#40b1e9',
      'linegradient-under-to': '#c4ebff',
      'card-bg': '#181b1c',
      toggle: '#6B6F71',
      button: '#181B1C',
    },
  };

  const theme = mode === 'light' ? themes.light : themes.dark;

  return Response.json(theme);
}
