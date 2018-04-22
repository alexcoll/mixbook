package com.mixbook.springmvc.Models;

/**
 * Models a JSON responses sent back from the controllers.
 * @author John Tyler Preston
 * @version 1.0
 */
public class JsonResponse {

	/**
	 * Status of a request, either OK or FAILED.
	 */
	private String responseStatus = "";

	/**
	 * Error of a request if applicable.
	 */
	private String errorMessage = "";

	/**
	 * Constructs an instance of a JSON response to be sent back to the client.
	 * @param responseStatus the status of a request.
	 * @param errorMessage the error of a request.
	 */
	public JsonResponse(String responseStatus, String errorMessage) {
		this.responseStatus = responseStatus;
		this.errorMessage = errorMessage;
	}

	/**
	 * Standard getter method for returning the response status of a JSON response.
	 * @return the response status of the JSON response.
	 */
	public String getResponseStatus() {
		return responseStatus;
	}

	/**
	 * Standard setter method for setting the response status for a JSON response.
	 * @param responseStatus the response status to set for the JSON response.
	 */
	public void setResponseStatus(String responseStatus) {
		this.responseStatus = responseStatus;
	}

	/**
	 * Standard getter method for returning the error message of a JSON response.
	 * @return the error message of the JSON response.
	 */
	public String getErrorMessage() {
		return errorMessage;
	}

	/**
	 * Standard setter method for setting the response status for a JSON response.
	 * @param errorMessage the error message to set for the JSON response.
	 */
	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}

}
