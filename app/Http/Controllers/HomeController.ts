import View from '@ioc:Adonis/Core/View'

class HomeController {
  public async show() {
    return View.render('home')
  }
}

export default HomeController
