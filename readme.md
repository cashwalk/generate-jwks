[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Simple JWKS generator 

> A simple package that issues jwks for asymmetric key authentication

## Usage

### Serving the app

```sh
$ npx generate-jwks --alg ${alg} --crv ${crv} --output
```

`output`

If present, it will output the generated key to the given path.
## License

[MIT License](https://andreasonny.mit-license.org/2019)
