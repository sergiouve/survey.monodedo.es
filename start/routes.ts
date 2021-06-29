import Route from '@ioc:Adonis/Core/Route'

/* Home */
Route.get('/', 'HomeController.show')

/* Survey */
Route.get('/survey', 'SurveyController.show').as('survey.show')
Route.post('survey', 'SurveyController.store').as('survey.save')
