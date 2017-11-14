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
    const { validateAll, validate } = this.app.use('@adonisjs/validator/src/Validator')
    const CE = this.app.use('@adonisjs/validator/src/Exceptions')

    /**
     * Extend request class by adding a macro, which pushes a
     * possibility to validate params directly
     */
    Request.macro('validate', async function (rules, messages = {}) {
      let validation = await validate(this.all(), rules, messages)
      if (validation.fails()) {
        throw CE.ValidationException.validationFailed(validation.messages())
      }
    })

    Request.macro('validateAll', async function (rules, messages = {}) {
      let validation = await validateAll(this.all(), rules, messages)
      if (validation.fails()) {
        throw CE.ValidationException.validationFailed(validation.messages())
      }
    })
  }
}

module.exports = RequestValidationProvider