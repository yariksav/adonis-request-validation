# Adonis Request Validation Provider

Adonis request validation provider extends request instance with validate function. Makes same implementation as in Laravel 5.5 framework
If the validation rules pass, your code will keep executing normally; however, if validation fails, an exception will be thrown and the proper error response will automatically be sent back to the user. In the case of a traditional HTTP request, a redirect response will be generated, while a JSON response will be sent for AJAX requests.

## Setup

Install the package from npm

```npm
npm install @adonisjs/request-validation
```

```javascript
const providers = [
  ...
  '@adonisjs/request-validation/providers/StorageProvider'
]
```

## Usage

```js
    await request.validate({
      name: 'required|min:5',
      status: 'required|in:A,D',
      objecttype: 'required|in:D,W,A,M'
    })
```


