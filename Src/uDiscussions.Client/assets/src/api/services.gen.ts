// This file is auto-generated by @hey-api/openapi-ts

import type { CancelablePromise } from './core/CancelablePromise';
import { OpenAPI } from './core/OpenAPI';
import { request as __request } from './core/request';
import type { GetCommentByIdData, GetCommentByIdResponse, PostCommentsData, PostCommentsResponse, GetCommentsResponse, GetCommentsByContentkeyData, GetCommentsByContentkeyResponse, GetCommentsByContentkeyApprovedData, GetCommentsByContentkeyApprovedResponse, GetCommentsByContentkeyApprovedCountData, GetCommentsByContentkeyApprovedCountResponse, GetCommentsByContentkeyCountData, GetCommentsByContentkeyCountResponse, GetCommentsByContentkeyUnapprovedData, GetCommentsByContentkeyUnapprovedResponse, PatchCommentsByIdApproveData, PatchCommentsByIdApproveResponse, DeleteCommentsByIdDeleteData, DeleteCommentsByIdDeleteResponse, PatchCommentsByIdRestoreData, PatchCommentsByIdRestoreResponse, PatchCommentsByIdTrashData, PatchCommentsByIdTrashResponse, GetCommentsCountResponse, GetCommentsTrashedResponse, GetCommentsTrashedCountResponse, GetCommentsUnapprovedResponse, GetCommentsUnapprovedCountResponse, PostDocumenttypesettingsData, PostDocumenttypesettingsResponse, GetDocumenttypesettingsByDocumentTypeData, GetDocumenttypesettingsByDocumentTypeResponse } from './types.gen';

export class CommmentsService {
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns unknown OK
     * @throws ApiError
     */
    public static getCommentById(data: GetCommentByIdData): CancelablePromise<GetCommentByIdResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comment/{id}',
            path: {
                id: data.id
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns boolean OK
     * @throws ApiError
     */
    public static postComments(data: PostCommentsData = {}): CancelablePromise<PostCommentsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/comments',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getComments(): CancelablePromise<GetCommentsResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments',
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.contentkey
     * @returns unknown OK
     * @throws ApiError
     */
    public static getCommentsByContentkey(data: GetCommentsByContentkeyData): CancelablePromise<GetCommentsByContentkeyResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/{contentkey}',
            path: {
                contentkey: data.contentkey
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.contentkey
     * @returns unknown OK
     * @throws ApiError
     */
    public static getCommentsByContentkeyApproved(data: GetCommentsByContentkeyApprovedData): CancelablePromise<GetCommentsByContentkeyApprovedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/{contentkey}/approved',
            path: {
                contentkey: data.contentkey
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.contentkey
     * @returns number OK
     * @throws ApiError
     */
    public static getCommentsByContentkeyApprovedCount(data: GetCommentsByContentkeyApprovedCountData): CancelablePromise<GetCommentsByContentkeyApprovedCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/{contentkey}/approved/count',
            path: {
                contentkey: data.contentkey
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.contentkey
     * @returns number OK
     * @throws ApiError
     */
    public static getCommentsByContentkeyCount(data: GetCommentsByContentkeyCountData): CancelablePromise<GetCommentsByContentkeyCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/{contentkey}/count',
            path: {
                contentkey: data.contentkey
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.contentkey
     * @returns unknown OK
     * @throws ApiError
     */
    public static getCommentsByContentkeyUnapproved(data: GetCommentsByContentkeyUnapprovedData): CancelablePromise<GetCommentsByContentkeyUnapprovedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/{contentkey}/unapproved',
            path: {
                contentkey: data.contentkey
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns boolean OK
     * @throws ApiError
     */
    public static patchCommentsByIdApprove(data: PatchCommentsByIdApproveData): CancelablePromise<PatchCommentsByIdApproveResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/comments/{id}/approve',
            path: {
                id: data.id
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns boolean OK
     * @throws ApiError
     */
    public static deleteCommentsByIdDelete(data: DeleteCommentsByIdDeleteData): CancelablePromise<DeleteCommentsByIdDeleteResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/comments/{id}/delete',
            path: {
                id: data.id
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns boolean OK
     * @throws ApiError
     */
    public static patchCommentsByIdRestore(data: PatchCommentsByIdRestoreData): CancelablePromise<PatchCommentsByIdRestoreResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/comments/{id}/restore',
            path: {
                id: data.id
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.id
     * @returns boolean OK
     * @throws ApiError
     */
    public static patchCommentsByIdTrash(data: PatchCommentsByIdTrashData): CancelablePromise<PatchCommentsByIdTrashResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/comments/{id}/trash',
            path: {
                id: data.id
            },
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @returns number OK
     * @throws ApiError
     */
    public static getCommentsCount(): CancelablePromise<GetCommentsCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/count',
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getCommentsTrashed(): CancelablePromise<GetCommentsTrashedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/trashed',
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @returns number OK
     * @throws ApiError
     */
    public static getCommentsTrashedCount(): CancelablePromise<GetCommentsTrashedCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/trashed/count',
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @returns unknown OK
     * @throws ApiError
     */
    public static getCommentsUnapproved(): CancelablePromise<GetCommentsUnapprovedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/unapproved',
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @returns number OK
     * @throws ApiError
     */
    public static getCommentsUnapprovedCount(): CancelablePromise<GetCommentsUnapprovedCountResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/comments/unapproved/count',
            errors: {
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
}

export class DocumentTypeSettingsService {
    /**
     * @param data The data for the request.
     * @param data.requestBody
     * @returns unknown OK
     * @throws ApiError
     */
    public static postDocumenttypesettings(data: PostDocumenttypesettingsData = {}): CancelablePromise<PostDocumenttypesettingsResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/documenttypesettings',
            body: data.requestBody,
            mediaType: 'application/json',
            errors: {
                400: 'Bad Request',
                401: 'The resource is protected and requires an authentication token'
            }
        });
    }
    
    /**
     * @param data The data for the request.
     * @param data.documentType
     * @returns unknown OK
     * @throws ApiError
     */
    public static getDocumenttypesettingsByDocumentType(data: GetDocumenttypesettingsByDocumentTypeData): CancelablePromise<GetDocumenttypesettingsByDocumentTypeResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/documenttypesettings/{documentType}',
            path: {
                documentType: data.documentType
            },
            errors: {
                401: 'The resource is protected and requires an authentication token',
                404: 'Not Found'
            }
        });
    }
    
}