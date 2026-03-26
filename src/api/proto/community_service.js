/* eslint-disable */
/*eslint-disable block-scoped-var, id-length, no-control-regex, no-magic-numbers, no-prototype-builtins, no-redeclare, no-shadow, no-var, sort-vars*/
"use strict";

var $protobuf = require("protobufjs");

// Common aliases
var $Reader = $protobuf.Reader,
  $Writer = $protobuf.Writer,
  $util = $protobuf.util;

// Exported root namespace
var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});

$root.api = (function () {
  /**
   * Namespace api.
   * @exports api
   * @namespace
   */
  var api = $root.api || {};

  api.community_service = (function () {
    /**
     * Namespace community_service.
     * @memberof api
     * @namespace
     */
    var community_service = {};

    community_service.CommunityService = (function () {
      /**
       * Properties of a CommunityService.
       * @memberof api.community_service
       * @interface ICommunityService
       * @property {number|null} [id] CommunityService id
       * @property {string|null} [name] CommunityService name
       * @property {string|null} [address] CommunityService address
       * @property {string|null} [phone] CommunityService phone
       * @property {number|null} [latitude] CommunityService latitude
       * @property {number|null} [longitude] CommunityService longitude
       * @property {number|Long|null} [createTime] CommunityService createTime
       */

      /**
       * Constructs a new CommunityService.
       * @memberof api.community_service
       * @classdesc Represents a CommunityService.
       * @implements ICommunityService
       * @constructor
       * @param {api.community_service.ICommunityService=} [properties] Properties to set
       */
      function CommunityService(properties) {
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
      }

      /**
       * CommunityService id.
       * @member {number} id
       * @memberof api.community_service.CommunityService
       * @instance
       */
      CommunityService.prototype.id = 0;

      /**
       * CommunityService name.
       * @member {string} name
       * @memberof api.community_service.CommunityService
       * @instance
       */
      CommunityService.prototype.name = "";

      /**
       * CommunityService address.
       * @member {string} address
       * @memberof api.community_service.CommunityService
       * @instance
       */
      CommunityService.prototype.address = "";

      /**
       * CommunityService phone.
       * @member {string} phone
       * @memberof api.community_service.CommunityService
       * @instance
       */
      CommunityService.prototype.phone = "";

      /**
       * CommunityService latitude.
       * @member {number} latitude
       * @memberof api.community_service.CommunityService
       * @instance
       */
      CommunityService.prototype.latitude = 0;

      /**
       * CommunityService longitude.
       * @member {number} longitude
       * @memberof api.community_service.CommunityService
       * @instance
       */
      CommunityService.prototype.longitude = 0;

      /**
       * CommunityService createTime.
       * @member {number|Long} createTime
       * @memberof api.community_service.CommunityService
       * @instance
       */
      CommunityService.prototype.createTime = $util.Long
        ? $util.Long.fromBits(0, 0, false)
        : 0;

      /**
       * Creates a new CommunityService instance using the specified properties.
       * @function create
       * @memberof api.community_service.CommunityService
       * @static
       * @param {api.community_service.ICommunityService=} [properties] Properties to set
       * @returns {api.community_service.CommunityService} CommunityService instance
       */
      CommunityService.create = function create(properties) {
        return new CommunityService(properties);
      };

      /**
       * Encodes the specified CommunityService message. Does not implicitly {@link api.community_service.CommunityService.verify|verify} messages.
       * @function encode
       * @memberof api.community_service.CommunityService
       * @static
       * @param {api.community_service.ICommunityService} message CommunityService message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      CommunityService.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (message.id != null && Object.hasOwnProperty.call(message, "id"))
          writer.uint32(/* id 1, wireType 0 =*/ 8).int32(message.id);
        if (message.name != null && Object.hasOwnProperty.call(message, "name"))
          writer.uint32(/* id 2, wireType 2 =*/ 18).string(message.name);
        if (
          message.address != null &&
          Object.hasOwnProperty.call(message, "address")
        )
          writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.address);
        if (
          message.phone != null &&
          Object.hasOwnProperty.call(message, "phone")
        )
          writer.uint32(/* id 4, wireType 2 =*/ 34).string(message.phone);
        if (
          message.latitude != null &&
          Object.hasOwnProperty.call(message, "latitude")
        )
          writer.uint32(/* id 5, wireType 5 =*/ 45).float(message.latitude);
        if (
          message.longitude != null &&
          Object.hasOwnProperty.call(message, "longitude")
        )
          writer.uint32(/* id 6, wireType 5 =*/ 53).float(message.longitude);
        if (
          message.createTime != null &&
          Object.hasOwnProperty.call(message, "createTime")
        )
          writer.uint32(/* id 7, wireType 0 =*/ 56).int64(message.createTime);
        return writer;
      };

      /**
       * Encodes the specified CommunityService message, length delimited. Does not implicitly {@link api.community_service.CommunityService.verify|verify} messages.
       * @function encodeDelimited
       * @memberof api.community_service.CommunityService
       * @static
       * @param {api.community_service.ICommunityService} message CommunityService message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      CommunityService.encodeDelimited = function encodeDelimited(
        message,
        writer,
      ) {
        return this.encode(message, writer).ldelim();
      };

      /**
       * Decodes a CommunityService message from the specified reader or buffer.
       * @function decode
       * @memberof api.community_service.CommunityService
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {api.community_service.CommunityService} CommunityService
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      CommunityService.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.api.community_service.CommunityService();
        while (reader.pos < end) {
          var tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              message.id = reader.int32();
              break;
            }
            case 2: {
              message.name = reader.string();
              break;
            }
            case 3: {
              message.address = reader.string();
              break;
            }
            case 4: {
              message.phone = reader.string();
              break;
            }
            case 5: {
              message.latitude = reader.float();
              break;
            }
            case 6: {
              message.longitude = reader.float();
              break;
            }
            case 7: {
              message.createTime = reader.int64();
              break;
            }
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };

      /**
       * Decodes a CommunityService message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof api.community_service.CommunityService
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {api.community_service.CommunityService} CommunityService
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      CommunityService.decodeDelimited = function decodeDelimited(reader) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };

      /**
       * Verifies a CommunityService message.
       * @function verify
       * @memberof api.community_service.CommunityService
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      CommunityService.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (message.id != null && message.hasOwnProperty("id"))
          if (!$util.isInteger(message.id)) return "id: integer expected";
        if (message.name != null && message.hasOwnProperty("name"))
          if (!$util.isString(message.name)) return "name: string expected";
        if (message.address != null && message.hasOwnProperty("address"))
          if (!$util.isString(message.address))
            return "address: string expected";
        if (message.phone != null && message.hasOwnProperty("phone"))
          if (!$util.isString(message.phone)) return "phone: string expected";
        if (message.latitude != null && message.hasOwnProperty("latitude"))
          if (typeof message.latitude !== "number")
            return "latitude: number expected";
        if (message.longitude != null && message.hasOwnProperty("longitude"))
          if (typeof message.longitude !== "number")
            return "longitude: number expected";
        if (message.createTime != null && message.hasOwnProperty("createTime"))
          if (
            !$util.isInteger(message.createTime) &&
            !(
              message.createTime &&
              $util.isInteger(message.createTime.low) &&
              $util.isInteger(message.createTime.high)
            )
          )
            return "createTime: integer|Long expected";
        return null;
      };

      /**
       * Creates a CommunityService message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof api.community_service.CommunityService
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {api.community_service.CommunityService} CommunityService
       */
      CommunityService.fromObject = function fromObject(object) {
        if (object instanceof $root.api.community_service.CommunityService)
          return object;
        var message = new $root.api.community_service.CommunityService();
        if (object.id != null) message.id = object.id | 0;
        if (object.name != null) message.name = String(object.name);
        if (object.address != null) message.address = String(object.address);
        if (object.phone != null) message.phone = String(object.phone);
        if (object.latitude != null) message.latitude = Number(object.latitude);
        if (object.longitude != null)
          message.longitude = Number(object.longitude);
        if (object.createTime != null)
          if ($util.Long)
            (message.createTime = $util.Long.fromValue(
              object.createTime,
            )).unsigned = false;
          else if (typeof object.createTime === "string")
            message.createTime = parseInt(object.createTime, 10);
          else if (typeof object.createTime === "number")
            message.createTime = object.createTime;
          else if (typeof object.createTime === "object")
            message.createTime = new $util.LongBits(
              object.createTime.low >>> 0,
              object.createTime.high >>> 0,
            ).toNumber();
        return message;
      };

      /**
       * Creates a plain object from a CommunityService message. Also converts values to other types if specified.
       * @function toObject
       * @memberof api.community_service.CommunityService
       * @static
       * @param {api.community_service.CommunityService} message CommunityService
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      CommunityService.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.defaults) {
          object.id = 0;
          object.name = "";
          object.address = "";
          object.phone = "";
          object.latitude = 0;
          object.longitude = 0;
          if ($util.Long) {
            var long = new $util.Long(0, 0, false);
            object.createTime =
              options.longs === String
                ? long.toString()
                : options.longs === Number
                  ? long.toNumber()
                  : long;
          } else object.createTime = options.longs === String ? "0" : 0;
        }
        if (message.id != null && message.hasOwnProperty("id"))
          object.id = message.id;
        if (message.name != null && message.hasOwnProperty("name"))
          object.name = message.name;
        if (message.address != null && message.hasOwnProperty("address"))
          object.address = message.address;
        if (message.phone != null && message.hasOwnProperty("phone"))
          object.phone = message.phone;
        if (message.latitude != null && message.hasOwnProperty("latitude"))
          object.latitude =
            options.json && !isFinite(message.latitude)
              ? String(message.latitude)
              : message.latitude;
        if (message.longitude != null && message.hasOwnProperty("longitude"))
          object.longitude =
            options.json && !isFinite(message.longitude)
              ? String(message.longitude)
              : message.longitude;
        if (message.createTime != null && message.hasOwnProperty("createTime"))
          if (typeof message.createTime === "number")
            object.createTime =
              options.longs === String
                ? String(message.createTime)
                : message.createTime;
          else
            object.createTime =
              options.longs === String
                ? $util.Long.prototype.toString.call(message.createTime)
                : options.longs === Number
                  ? new $util.LongBits(
                      message.createTime.low >>> 0,
                      message.createTime.high >>> 0,
                    ).toNumber()
                  : message.createTime;
        return object;
      };

      /**
       * Converts this CommunityService to JSON.
       * @function toJSON
       * @memberof api.community_service.CommunityService
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      CommunityService.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      /**
       * Gets the default type url for CommunityService
       * @function getTypeUrl
       * @memberof api.community_service.CommunityService
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      CommunityService.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com";
        }
        return typeUrlPrefix + "/api.community_service.CommunityService";
      };

      return CommunityService;
    })();

    community_service.CommunityServiceResponse = (function () {
      /**
       * Properties of a CommunityServiceResponse.
       * @memberof api.community_service
       * @interface ICommunityServiceResponse
       * @property {Array.<api.community_service.ICommunityService>|null} [communityServices] CommunityServiceResponse communityServices
       * @property {number|null} [code] CommunityServiceResponse code
       * @property {string|null} [message] CommunityServiceResponse message
       */

      /**
       * Constructs a new CommunityServiceResponse.
       * @memberof api.community_service
       * @classdesc Represents a CommunityServiceResponse.
       * @implements ICommunityServiceResponse
       * @constructor
       * @param {api.community_service.ICommunityServiceResponse=} [properties] Properties to set
       */
      function CommunityServiceResponse(properties) {
        this.communityServices = [];
        if (properties)
          for (var keys = Object.keys(properties), i = 0; i < keys.length; ++i)
            if (properties[keys[i]] != null)
              this[keys[i]] = properties[keys[i]];
      }

      /**
       * CommunityServiceResponse communityServices.
       * @member {Array.<api.community_service.ICommunityService>} communityServices
       * @memberof api.community_service.CommunityServiceResponse
       * @instance
       */
      CommunityServiceResponse.prototype.communityServices = $util.emptyArray;

      /**
       * CommunityServiceResponse code.
       * @member {number} code
       * @memberof api.community_service.CommunityServiceResponse
       * @instance
       */
      CommunityServiceResponse.prototype.code = 0;

      /**
       * CommunityServiceResponse message.
       * @member {string} message
       * @memberof api.community_service.CommunityServiceResponse
       * @instance
       */
      CommunityServiceResponse.prototype.message = "";

      /**
       * Creates a new CommunityServiceResponse instance using the specified properties.
       * @function create
       * @memberof api.community_service.CommunityServiceResponse
       * @static
       * @param {api.community_service.ICommunityServiceResponse=} [properties] Properties to set
       * @returns {api.community_service.CommunityServiceResponse} CommunityServiceResponse instance
       */
      CommunityServiceResponse.create = function create(properties) {
        return new CommunityServiceResponse(properties);
      };

      /**
       * Encodes the specified CommunityServiceResponse message. Does not implicitly {@link api.community_service.CommunityServiceResponse.verify|verify} messages.
       * @function encode
       * @memberof api.community_service.CommunityServiceResponse
       * @static
       * @param {api.community_service.ICommunityServiceResponse} message CommunityServiceResponse message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      CommunityServiceResponse.encode = function encode(message, writer) {
        if (!writer) writer = $Writer.create();
        if (
          message.communityServices != null &&
          message.communityServices.length
        )
          for (var i = 0; i < message.communityServices.length; ++i)
            $root.api.community_service.CommunityService.encode(
              message.communityServices[i],
              writer.uint32(/* id 1, wireType 2 =*/ 10).fork(),
            ).ldelim();
        if (message.code != null && Object.hasOwnProperty.call(message, "code"))
          writer.uint32(/* id 2, wireType 0 =*/ 16).int32(message.code);
        if (
          message.message != null &&
          Object.hasOwnProperty.call(message, "message")
        )
          writer.uint32(/* id 3, wireType 2 =*/ 26).string(message.message);
        return writer;
      };

      /**
       * Encodes the specified CommunityServiceResponse message, length delimited. Does not implicitly {@link api.community_service.CommunityServiceResponse.verify|verify} messages.
       * @function encodeDelimited
       * @memberof api.community_service.CommunityServiceResponse
       * @static
       * @param {api.community_service.ICommunityServiceResponse} message CommunityServiceResponse message or plain object to encode
       * @param {$protobuf.Writer} [writer] Writer to encode to
       * @returns {$protobuf.Writer} Writer
       */
      CommunityServiceResponse.encodeDelimited = function encodeDelimited(
        message,
        writer,
      ) {
        return this.encode(message, writer).ldelim();
      };

      /**
       * Decodes a CommunityServiceResponse message from the specified reader or buffer.
       * @function decode
       * @memberof api.community_service.CommunityServiceResponse
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @param {number} [length] Message length if known beforehand
       * @returns {api.community_service.CommunityServiceResponse} CommunityServiceResponse
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      CommunityServiceResponse.decode = function decode(reader, length) {
        if (!(reader instanceof $Reader)) reader = $Reader.create(reader);
        var end = length === undefined ? reader.len : reader.pos + length,
          message = new $root.api.community_service.CommunityServiceResponse();
        while (reader.pos < end) {
          var tag = reader.uint32();
          switch (tag >>> 3) {
            case 1: {
              if (
                !(message.communityServices && message.communityServices.length)
              )
                message.communityServices = [];
              message.communityServices.push(
                $root.api.community_service.CommunityService.decode(
                  reader,
                  reader.uint32(),
                ),
              );
              break;
            }
            case 2: {
              message.code = reader.int32();
              break;
            }
            case 3: {
              message.message = reader.string();
              break;
            }
            default:
              reader.skipType(tag & 7);
              break;
          }
        }
        return message;
      };

      /**
       * Decodes a CommunityServiceResponse message from the specified reader or buffer, length delimited.
       * @function decodeDelimited
       * @memberof api.community_service.CommunityServiceResponse
       * @static
       * @param {$protobuf.Reader|Uint8Array} reader Reader or buffer to decode from
       * @returns {api.community_service.CommunityServiceResponse} CommunityServiceResponse
       * @throws {Error} If the payload is not a reader or valid buffer
       * @throws {$protobuf.util.ProtocolError} If required fields are missing
       */
      CommunityServiceResponse.decodeDelimited = function decodeDelimited(
        reader,
      ) {
        if (!(reader instanceof $Reader)) reader = new $Reader(reader);
        return this.decode(reader, reader.uint32());
      };

      /**
       * Verifies a CommunityServiceResponse message.
       * @function verify
       * @memberof api.community_service.CommunityServiceResponse
       * @static
       * @param {Object.<string,*>} message Plain object to verify
       * @returns {string|null} `null` if valid, otherwise the reason why it is not
       */
      CommunityServiceResponse.verify = function verify(message) {
        if (typeof message !== "object" || message === null)
          return "object expected";
        if (
          message.communityServices != null &&
          message.hasOwnProperty("communityServices")
        ) {
          if (!Array.isArray(message.communityServices))
            return "communityServices: array expected";
          for (var i = 0; i < message.communityServices.length; ++i) {
            var error = $root.api.community_service.CommunityService.verify(
              message.communityServices[i],
            );
            if (error) return "communityServices." + error;
          }
        }
        if (message.code != null && message.hasOwnProperty("code"))
          if (!$util.isInteger(message.code)) return "code: integer expected";
        if (message.message != null && message.hasOwnProperty("message"))
          if (!$util.isString(message.message))
            return "message: string expected";
        return null;
      };

      /**
       * Creates a CommunityServiceResponse message from a plain object. Also converts values to their respective internal types.
       * @function fromObject
       * @memberof api.community_service.CommunityServiceResponse
       * @static
       * @param {Object.<string,*>} object Plain object
       * @returns {api.community_service.CommunityServiceResponse} CommunityServiceResponse
       */
      CommunityServiceResponse.fromObject = function fromObject(object) {
        if (
          object instanceof $root.api.community_service.CommunityServiceResponse
        )
          return object;
        var message =
          new $root.api.community_service.CommunityServiceResponse();
        if (object.communityServices) {
          if (!Array.isArray(object.communityServices))
            throw TypeError(
              ".api.community_service.CommunityServiceResponse.communityServices: array expected",
            );
          message.communityServices = [];
          for (var i = 0; i < object.communityServices.length; ++i) {
            if (typeof object.communityServices[i] !== "object")
              throw TypeError(
                ".api.community_service.CommunityServiceResponse.communityServices: object expected",
              );
            message.communityServices[i] =
              $root.api.community_service.CommunityService.fromObject(
                object.communityServices[i],
              );
          }
        }
        if (object.code != null) message.code = object.code | 0;
        if (object.message != null) message.message = String(object.message);
        return message;
      };

      /**
       * Creates a plain object from a CommunityServiceResponse message. Also converts values to other types if specified.
       * @function toObject
       * @memberof api.community_service.CommunityServiceResponse
       * @static
       * @param {api.community_service.CommunityServiceResponse} message CommunityServiceResponse
       * @param {$protobuf.IConversionOptions} [options] Conversion options
       * @returns {Object.<string,*>} Plain object
       */
      CommunityServiceResponse.toObject = function toObject(message, options) {
        if (!options) options = {};
        var object = {};
        if (options.arrays || options.defaults) object.communityServices = [];
        if (options.defaults) {
          object.code = 0;
          object.message = "";
        }
        if (message.communityServices && message.communityServices.length) {
          object.communityServices = [];
          for (var j = 0; j < message.communityServices.length; ++j)
            object.communityServices[j] =
              $root.api.community_service.CommunityService.toObject(
                message.communityServices[j],
                options,
              );
        }
        if (message.code != null && message.hasOwnProperty("code"))
          object.code = message.code;
        if (message.message != null && message.hasOwnProperty("message"))
          object.message = message.message;
        return object;
      };

      /**
       * Converts this CommunityServiceResponse to JSON.
       * @function toJSON
       * @memberof api.community_service.CommunityServiceResponse
       * @instance
       * @returns {Object.<string,*>} JSON object
       */
      CommunityServiceResponse.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };

      /**
       * Gets the default type url for CommunityServiceResponse
       * @function getTypeUrl
       * @memberof api.community_service.CommunityServiceResponse
       * @static
       * @param {string} [typeUrlPrefix] your custom typeUrlPrefix(default "type.googleapis.com")
       * @returns {string} The default type url
       */
      CommunityServiceResponse.getTypeUrl = function getTypeUrl(typeUrlPrefix) {
        if (typeUrlPrefix === undefined) {
          typeUrlPrefix = "type.googleapis.com";
        }
        return (
          typeUrlPrefix + "/api.community_service.CommunityServiceResponse"
        );
      };

      return CommunityServiceResponse;
    })();

    return community_service;
  })();

  return api;
})();

module.exports = $root;
