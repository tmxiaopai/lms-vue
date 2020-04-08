import Mock from 'mockjs'

Mock.mock('http://localhost:8080/getUser',{
  name: '@name',
  email: '@email',
  'age | 15-25': 5
})
