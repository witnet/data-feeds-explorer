#!/bin/bash
set -e;

# a default non-root role
MONGO_NON_ROOT_ROLE="${MONGO_NON_ROOT_ROLE:-readWrite}"

echo ">>>>>>> Creating database and users..."
if [ -n "${MONGO_DATABASE_USERNAME:-}" ] && [ -n "${MONGO_DATABASE_PASSWORD:-}" ]; then
	mongo -u $MONGO_INITDB_ROOT_USERNAME -p $MONGO_INITDB_ROOT_PASSWORD <<-EOF
		db=db.getSiblingDB("$MONGO_INITDB_DATABASE");
		use $MONGO_INITDB_DATABASE
		db.createUser({
			user: $(_js_escape "$MONGO_DATABASE_USERNAME"),
			pwd: $(_js_escape "$MONGO_DATABASE_PASSWORD"),
			roles: [ { role: $(_js_escape "$MONGO_NON_ROOT_ROLE"), db: $(_js_escape "$MONGO_INITDB_DATABASE") } ]
			})
	EOF
else
	echo "Database and user creation failed. The variables listed in .env.sample must be provided in a .env file."
	exit 403
fi