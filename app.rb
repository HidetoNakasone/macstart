
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
    port: ENV['PORT'],
    dbname: ENV['DATABASE'],
    user: ENV['USER'],
    password: ENV['PASSWORD']
  )
end

get '/' do
  # @res = db.exec('select * from posts;')
  # @dev = (
  #   host: ENV['HOST'],
  #   port: ENV['PORT'],
  #   dbname: ENV['DATABSE'],
  #   user: ENV['USER'],
  #   password: ENV['PASSWORD']
  # )
  @dev = ENV['HOST'] + ENV['PORT'] + ENV['DATABASE'] + ENV['USER'] + ENV['PASSWORD']
  @res = [{}]
  erb :index
end

get '/ajax/dev' do
  {name: 'サンプルだよ！', msg: '中身の例'}.to_json
end


post '/add' do
  db.exec('insert into posts(slide_num, title, content, created_at, updated_at) values($1, $2, $3, $4, $5);', [params[:slide_num], params[:title], params[:content].gsub(/\r\n|\r|\n/, "<br />"), DateTime.now, DateTime.now])
  redirect '/'
end
