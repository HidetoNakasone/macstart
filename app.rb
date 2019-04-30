
require 'sinatra'
require 'sinatra/reloader'
require 'pg'

# def db 
#   @db ||= PG.connect(
#     host: '127.0.0.1',
#     user: 'hep',
#     password: 'hep',
#     dbname: 'macstart'
#   )
# end

def db
  @db ||= PG.connect(
    host: ENV['HOST'],
    user: ENV['USER'],
    password: ENV['PASSWORD'],
    dbname: ENV['DATABASE']
  )
end

get '/' do
  @res = db.exec('select * from posts order by id desc;')
  erb :index
end

get '/ajax/dev' do
  {name: 'サンプルだよ！', msg: '中身の例'}.to_json
end


post '/add' do
  db.exec('insert into posts(slide_num, title, content, created_at, updated_at) values($1, $2, $3, $4, $5);', [params[:slide_num], params[:title], params[:content].gsub(/\r\n|\r|\n/, "<br />"), DateTime.now, DateTime.now])
  redirect '/'
end
