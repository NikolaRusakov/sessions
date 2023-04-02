```
npx nx g @nxrocks/nx-micronaut:new sessions --type=DEFAULT --name=sessions --package-doto.solutions --javaVersion=JDK_17 --lang=
KOTLIN --buildSystem=GRADLE_KOTLIN --test=KOTEST --features=openapi,swagger-ui,liquibase,microstream,multi-tenancy,postgres,microstream-rest,agorapulse-gru-http,tracing-opentelemetry-jaeger,kotlin-extension-functions,micrometer-prometheus,nats,graalvm,crac,micronaut-aot,reactor,netflix-hystrix,security-oauth2,security-jwt,discovery-consul,problem-json,views-velocity,config4k,test-resources,netty-server,graphql,redis-lettuce,testcontainers,jackson-databind,serialization-jackson --version=3.7.1
```

```
type=DEFAULT&name=sessions&package=doto.solutions&javaVersion=JDK_17&lang=KOTLIN&build=GRADLE_KOTLIN&test=KOTEST --features=openapi,swagger-ui,liquibase,microstream,multi-tenancy,postgres,microstream-rest,agorapulse-gru-http,tracing-opentelemetry-jaeger,kotlin-extension-functions,micrometer-prometheus,nats,graalvm,crac,micronaut-aot,reactor,netflix-hystrix,security-oauth2,security-jwt,discovery-consul,problem-json,views-velocity,config4k,test-resources,netty-server,graphql,redis-lettuce,testcontainers,jackson-databind,serialization-jackson&version=3.7.1
```

## tools

Nx
Storybook
Playwright
@sveltosis/parser - mitosis component generator from svelte

## fe

tailwindcss / windicss - react
analog.js
angular
astro
state-adapt; ngneat/elf

## be

terminusdb - graph db
h3 be + zod - http server
drizzle-orm - orm

## OPS

SST - deployment
Dagger.io - CI/CD

## API

graphql client on BE
meilisearch client - full-text search
orval - api client
Casdoor - IAM,SSO,OIDC, permissions
MinIO

## Data

cube.js - user analytics
jitsu - data integration platform

serve mock json schema w/

```bash
npx json-server --watch apps/analog-app/src/public/assets/schema.json --port 3006
```
