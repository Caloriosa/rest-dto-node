/**
 * @class
 */
class DtoError extends Error {}

/**
 * @class
 */
class DtoMappingError extends DtoError {}

module.exports = {
  DtoError,
  DtoMappingError
}
