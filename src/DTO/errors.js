/**
 * @class
 */
class DtoError extends Error {}

/**
 * @class
 */
class DtoMappingError extends DtoError {}

modules.exports = {
    DtoError: DtoError,
    DtoMappingError: DtoMappingError
}