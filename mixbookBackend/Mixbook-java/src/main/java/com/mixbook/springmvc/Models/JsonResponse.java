package com.mixbook.springmvc.Models;

public class JsonResponse {

	private String responseStatus = "";
	private String errorMessage = "";

	public JsonResponse(String responseStatus, String errorMessage) {
		this.responseStatus = responseStatus;
		this.errorMessage = errorMessage;
	}

	public String getResponseStatus() {
		return responseStatus;
	}

	public void setResponseStatus(String responseStatus) {
		this.responseStatus = responseStatus;
	}

	public String getErrorMessage() {
		return errorMessage;
	}

	public void setErrorMessage(String errorMessage) {
		this.errorMessage = errorMessage;
	}
	
}
