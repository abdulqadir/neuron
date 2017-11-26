import falcon, sqlite3, json

conn = sqlite3.connect('data.db')

class Search(object):
    def on_get(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin','*')
        if 'query' in req.params:
            query = req.params['query']
            query = query.replace('"', ' ')
            print('Searching... ' + query)
            cursor = conn.cursor()
            results = {}
            for res in cursor.execute('Select id, snippet(search), title, type from search where title match ?',(query, )):
                d = results.get(res[0],{})
                d['id'] = res[0]
                d['snippet'] = res[1]
                d['title'] = res[2]
                d['type'] = res[3]
                d['score'] = d.get('score', 0) + (10 * len(res[1].split('<b>')))
                results[res[0]] = d
            for res in cursor.execute('Select id, snippet(search), title, type from search where keywords match ?',(query, )):
                d = results.get(res[0],{})
                d['id'] = res[0]
                d['snippet'] = res[1]
                d['title'] = res[2]
                d['type'] = res[3]
                d['score'] = d.get('score', 0) + (5 * len(res[1].split('<b>')))
                results[res[0]] = d
            for res in cursor.execute('Select id, snippet(search), title, type from search where description match ?',(query, )):
                d = results.get(res[0],{})
                d['id'] = res[0]
                d['snippet'] = res[1]
                d['title'] = res[2]
                d['type'] = res[3]
                d['score'] = d.get('score', 0) + (5 * len(res[1].split('<b>')))
                results[res[0]] = d
            results = sorted(map(lambda x: results[x], results.keys()), key=lambda x:-x['score'])
            resp.content_type = 'application/json'
            resp.body = json.dumps(results)

class Data(object):
    def on_get(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin','*')
        if 'id' in req.params:
            query = req.params['id']
            query = query.replace('"', ' ')
            print('Data... ' + query)
            cursor = conn.cursor()
            data = ''
            for res in cursor.execute('Select id, data from data where id = ?',(query,)):
                data = res[1]
            resp.content_type = 'application/json'
            resp.body = data

class Dummy(object):
    def on_get(self, req, resp):
        resp.set_header('Access-Control-Allow-Origin','*')

search = Search()
data = Data()
dummy = Dummy()
app = falcon.API()
app.add_route('/search', search)
app.add_route('/data', data)
app.add_route('/keepalive', dummy)
