'use strict'

/*
 * adonis-request-validator
 *
 * (c) Savaryn Yaroslav <yariksav@gmail.com>
 *
 */
const { ServiceProvider } = require('@adonisjs/fold')

class RequestValidationProvider extends ServiceProvider {

  boot () {
    const Request = this.app.use('Adonis/Src/Request')
    const { validateAll } = this.app.use('@adonisjs/validator/src/Validator')
    const CE = this.app.use('@adonisjs/validator/src/Exceptions')

    /**
     * Extend route class by adding a macro, which pushes a
     * possibility to simple validate request
     */
    Request.macro('validate', async function (rules) {
      let validation = await validateAll(this.all(), rules)
      if (validation.fails()) {
        throw CE.ValidationException.validationFailed(validation.messages())
      }
    })
  }
}

module.exports = RequestValidationProvider