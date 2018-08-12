json.partial! 'api/routes/route', route: @route

json.errors do
  json.array! @route.errors
end
