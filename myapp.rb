require 'sinatra'
require "sinatra/json"
require 'haml'
require 'pry'

set :public_folder, settings.root + '/assets'
set :views, settings.root

get '/signup' do
  haml :index, :format => :html5
end

post '/Register' do
  content_type :json
  data = JSON.parse(request.body.read)
  if data['phone'] == "+380(50)452-80-69"
    json :success => 'phone-sms-authorization-key'
  else
    json :error => 'Something Went Wrong'
  end
end

post '/Verify' do
  content_type :json
  data = JSON.parse(request.body.read)
  if data['sms'] == "aaaa"
    json :success => 'phone-sms-authorization-key'
  else
    json :error => 'The token is Invalid!!!!'
  end
end
