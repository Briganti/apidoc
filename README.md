# apiDoc

Generates a RESTful web API Documentation.

[![Build Status](https://travis-ci.org/apidoc/apidoc.svg?branch=master)](https://travis-ci.org/apidoc/apidoc)
[![Dependency Status](https://david-dm.org/apidoc/apidoc.svg)](https://david-dm.org/apidoc/apidoc)
[![NPM version](https://badge.fury.io/js/apidoc.svg)](http://badge.fury.io/js/apidoc)

#### Extinderi ####
* Internal references (for descriptions): @apiParam {string=[apiGroup]##[apiName]##[param definition]} ...
* Internal references (for param types): @apiParam {#[Type]} ...
* Method order: @api {method} path [order number] [title] (Ex. @api {get} /asirom/caminul_meu/getCotatie 03 Cotatie)