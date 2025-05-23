#  ONVP Backend - Backend API provider for the ONVP website
#
# Copyright (c) 2025.  Sjoerd van Leent
#
# This program is free software: you can redistribute it and/or modify
# it under the terms of the GNU Affero General Public License as
# published by the Free Software Foundation, either version 3 of the
# License, or (at your option) any later version.
#
# This program is distributed in the hope that it will be useful,
# but WITHOUT ANY WARRANTY; without even the implied warranty of
# MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
# GNU Affero General Public License for more details.
#
# You should have received a copy of the GNU Affero General Public License
# along with this program.  If not, see <https://www.gnu.org/licenses/>.

FROM docker.io/node:22.13.1 AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

RUN npm install -g @angular/cli@18.2.2

COPY . .

RUN ng build --configuration=production

FROM docker.io/nginx:latest

COPY --from=build app/dist/onvp-frontend/browser /usr/share/nginx/html
COPY ./container/default.conf /etc/nginx/templates/default.conf.template
RUN rm -f /usr/share/nginx/html/index*
ENV REVERSE_PROXY_URL=http://host.containers.internal:8080

EXPOSE 80
