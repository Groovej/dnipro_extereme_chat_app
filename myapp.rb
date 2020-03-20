require 'sinatra'
require "sinatra/json"
require 'haml'
require 'pry'

set :public_folder, settings.root + '/assets'
set :views, settings.root
set :layout, :base
set :format, :html5

get '/signin' do
  haml :index
end

get '/signup' do
  haml :index
end

post '/Register' do
  content_type :json
  # returns SMS key for validation
  data = JSON.parse(request.body.read)
  if data['phone'] == "+380(50)452-80-69"
    json :success => 'phone-sms-authorization-key'
  else
    json :error => 'Something Went Wrong'
  end
end

post '/Verify' do
  # returns validation token for future actions
  content_type :json
  data = JSON.parse(request.body.read)
  if data['sms'] == "aaaa"
    json JSON.generate({ :success => { :token => 'Uniq-authorization-token', :phone => "+380(50)452-80-69" } })
  else
    json :error => 'The SMS KEY is Invalid!!!!'
  end
end

post '/Reset' do
  content_type :json
  data = JSON.parse(request.body.read)
  if data['phone'] == "+380(50)452-80-69"
    # pass should be reset HERE, and return SMS token, for verification
    json :success => 'phone-sms-authorization-key'
  else
    json :error => 'Something Went Wrong'
  end
end

post '/getToken' do
  # this method returns only SMS key for verification for signed user in our Sysytem, for other -> we sugest to fill in SignUp Form
  content_type :json
  data = JSON.parse(request.body.read)
  if data['phone'] == "+380(50)452-80-69"
    json :success => 'phone-sms-authorization-key'
  else
    json :error => 'Something Went Wrong'
  end
end

post '/Authenticate' do
  # authentication by phone and password
  content_type :json
  data = JSON.parse(request.body.read)
  if data['phone'] == "+380(50)452-80-69" && data['password'] == '111111'
    json JSON.generate({ :success => { :token => 'Uniq-authorization-token', :phone => "+380(50)452-80-69" } })
  else
    json :error => 'Something Went Wrong'
  end
end

get '/*' do
  viewname = params[:splat].first
  if File.exist?("views/#{viewname}.haml")
    haml :"#{viewname}"
  else
    haml :forbidden
  end
end
