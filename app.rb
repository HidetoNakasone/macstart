
require 'sinatra'
require 'sinatra/reloader'

require 'pg'

require 'dotenv'
Dotenv.load ".env"

def db
  @db ||= PG.connect(
    host: ENV['HOST'],
    user: ENV['USER_NAME'],
    password: ENV['PASSWORD'],
    dbname: ENV['DATABASE']
  )
end

get '/' do
  # @res = db.exec('SELECT * FROM posts ORDER BY id ASC FETCH FIRST 1 ROWS ONLY;')
  @res = []
  erb :index
end

get '/ajax/dev' do
  get_size = 3
  # 〇〇までを除外して、〇〇個取得
  res = db.exec('SELECT * FROM posts ORDER BY id ASC OFFSET $1 ROWS FETCH FIRST $2 ROWS ONLY;', [params[:read_first_num], get_size]).map{ |i| i }
  # res = [{'id' => 0, 'slide_num' => 0, 'title' => 'タイトル', 'content' => "コンテンツ"}, {'id' => 0, 'slide_num' => 0, 'title' => 'タイトル', 'content' => "コンテンツ"}, {'id' => 0, 'slide_num' => 0, 'title' => 'タイトル', 'content' => "コンテンツ"}, {'id' => 0, 'slide_num' => 0, 'title' => 'タイトル', 'content' => "コンテンツ"}, {'id' => 0, 'slide_num' => 0, 'title' => 'タイトル', 'content' => "コンテンツ"}, ]
  res.to_json
end


# post '/add' do
#   db.exec('insert into posts(slide_num, title, content, created_at, updated_at) values($1, $2, $3, $4, $5);', [params[:slide_num], params[:title], params[:content].gsub(/\r\n|\r|\n/, "<br />"), DateTime.now, DateTime.now])
#   redirect '/'
# end
