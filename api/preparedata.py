import sqlite3, json

conn = sqlite3.connect('data.db')
cursor = conn.cursor()

cursor.execute('Drop table if exists data')
cursor.execute('Create table data (id text, data text)')

cursor.execute('Drop table if exists search')
cursor.execute('Create virtual table search using fts4(id text, title text, description text, keywords text, type text, tokenize=porter)')

unofile = open('unossc.json','r')
uno = json.loads(unofile.read())

for i in range(len(uno)):
    record = uno[i]
    data = {}
    id = "uno-" + str(i)
    data['title'] = record['chapter_title']
    data['description'] = record['abstract']
    data['country'] = record['country']
    data['record_type'] = 'Document'
    data['mdg'] = record['mdg']
    data['volume'] = record['volume_title']
    data['url'] = record['document_url']
    data['source'] = 'UN South South'
    print(id, data)
    cursor.execute('Insert into data values (:id, :data)', {"id": id, "data": json.dumps(data)})
    cursor.execute('Insert into search values (:id, :title, :description, :keywords, :type)', {"id":id, "title":data['title'], "description":data["description"], "keywords":"", "type":"Document"})
    conn.commit()

eenfile = open('een.json','r')
een = json.loads(eenfile.read())

for i in range(len(een)):
    record = een[i]
    data = {}
    id = "een-" + str(i)
    data['title'] = record['title']
    data['description'] = record['description']
    data['country'] = record['country']
    data['record_type'] = record['type']
    data['summary'] = record['summary']
    data['client'] = {
            'country': record['client_country'],
            'year_est': record['client_year_est'],
            'type': record['client_type'],
            }
    data['stage_of_development'] = record['stage_of_development']
    data['source'] = 'EEN'
    print(id, data)
    cursor.execute('Insert into data values (:id, :data)', {"id": id, "data": json.dumps(data)})
    cursor.execute('Insert into search values (:id, :title, :description, :keywords, :type)', {"id":id, "title":data['title'], "description":data["description"], "keywords":record['market_keywords'] + ' ' + record['nace_keywords'], "type":record['type']})
    conn.commit()
