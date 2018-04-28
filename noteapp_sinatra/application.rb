require 'sinatra'
require 'sinatra/reloader'
require 'tilt/erubis'

get '/' do
  File.read "public/index.html"
end

get '/progress' do
  File.read('public/progressview.html')
end