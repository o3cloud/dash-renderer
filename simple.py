import dash
import dash_core_components as dcc
import dash_html_components as html

print(dcc.__version__) # 0.6.0 or above is required

external_stylesheets = ['https://codepen.io/chriddyp/pen/bWLwgP.css']

app = dash.Dash(__name__, external_stylesheets=external_stylesheets)

app.layout = html.Div([
    # represents the URL bar, doesn't render anything
    dcc.Location(id='url', refresh=False),

    dcc.Link('Navigate to "/"', href='/'),
    html.Button(id='jump'),
    html.Div(id="dumb", n_clicks=0),
    html.Br(),

    # content will be rendered in this element
    html.Div(id='page-content')
])


@app.callback(dash.dependencies.Output('page-content', 'children'),
              [dash.dependencies.Input('url', 'pathname')])
def display_page(pathname):
    return html.Div([
        html.H3('You are on page {}'.format(pathname))
    ])

@app.callback(dash.dependencies.Output('dumb', 'children'),
              [dash.dependencies.Input('jump', 'n_clicks')])
def jump(n_clicks):
    return html.Div([
        html.H3('You are on page {}'.format('n_clicks'))
    ])

if __name__ == '__main__':
    app.run_server(debug=True)
