# zen2woo
Script that migrates zen cart stores to woocommerce.

**Setup**

Install docker and lando

https://docs.lando.dev/basics/

https://docs.docker.com/v17.09/engine/installation/

https://docs.docker.com/compose/install/

***Local***

`git submodules pull`

Migration Server runs at localhost:3000

Wordpress / Lando runs at http://oob2.lndo.site/

This is a dev project, no data is sensitive

Wordpress login is: http://oob2.lndo.site/wp-admin

admin:admin


Restfull routes:

localhost:3000/import
Loads data from Zen Cart api(see bellow) and stores it in local mongo db.
localhost:3000/export
Formats data and sends it to WooCommerceAPI api.

## Backend zen cart API

GET Only

http://www.outofbodypiercings.com/wpoob/?attributes

http://www.outofbodypiercings.com/wpoob/?products

http://www.outofbodypiercings.com/wpoob/?categories

{returns} json response.

## MVC structure:

classes/

Contains setting files for mongo database:

zen2woo/classes/mongoose.js

Contains string pointing to local or remote mongo addreess.

zen2woo/classes/wooCommerceAPI.js

Configuration for woocommerce api

zen2woo/classes/oobAPI.js

Contains functions that load json from Zen cart api.

classes/migrate/

Classes that format data from mongodb after import, via async methods posts to woocommere api.
Each belongs to an entity such as products, categories, attributes and terms.

classes/schema classes/models

Handles mongoose orm mapping for mongodb

---

controllers/

Handles importing of data and exporting via classes and mongodb

---

views/

Not used

---

WooCommerceAPI is hosted on Digital Ocean server.
It is not for production, so can be rebuilt as needed.
