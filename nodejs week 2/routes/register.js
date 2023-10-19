const express = require('express')
const router = express.Router()
const { body, validationResult } = require('express-validator')

router.get('/', (req, res) => {
  try {
    res.render('form')
  } catch (err) {
    res.status(500).json({ message: err.message })
  }
})

router.post(
  '/',
  [
    // username
    body('fullName')
      .trim()
      .notEmpty()
      .isAlpha()
      .withMessage('only letters are allowed'),

    // email
    body('email')
      .isEmail()
      .normalizeEmail()
      .custom((e) => e.endsWith('@gmail.com'))
      .withMessage('enter a valid email address'),

    // password
    body('password').isStrongPassword().withMessage('password must be strong'),

    // passwordConfirm
    body('passwordConfirm')
      .custom((v, { req }) => v === req.body.password)
      .withMessage('passwords do not match'),
      
    // birthdate
    body('birthdate').isDate().withMessage('enter a valid date'),
  ],
  (req, res) => {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() })
      }
      res.status(200).json({ message: 'success' })
    } catch (err) {
      res.status(400).json({ message: err.message })
    }
  }
)

module.exports = router
