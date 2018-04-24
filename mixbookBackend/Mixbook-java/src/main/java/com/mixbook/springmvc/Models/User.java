package com.mixbook.springmvc.Models;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.CascadeType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;

/**
 * Models a user.
 * @author John Tyler Preston
 * @version 1.0
 */
@Entity
@Table(name = "users")
@JsonInclude(Include.NON_EMPTY)
public class User implements Serializable {

	/**
	 * Primary key of the User table.
	 */
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "user_id", nullable = false)
	private Integer userId;

	/**
	 * Username of the user.
	 */
	@NotNull
	@Size(max = 255)
	@Column(name = "username", nullable = false)
	private String username;

	/**
	 * Password of the user.
	 */
	@NotNull
	@Size(max = 255)
	@Column(name = "password", nullable = false)
	private String password;

	/**
	 * First name of the user.
	 */
	@NotNull
	@Size(max = 255)
	@Column(name = "first_name", nullable = false)
	private String firstName;

	/**
	 * Last name of the user.
	 */
	@NotNull
	@Size(max = 255)
	@Column(name = "last_name", nullable = false)
	private String lastName;

	/**
	 * Email of the user.
	 */
	@NotNull
	@Size(max = 255)
	@Column(name = "email", nullable = false)
	private String email;

	/**
	 * Number of recipes that the user has created.
	 */
	@Column(name = "number_of_recipes", nullable = false)
	private int numberOfRecipes;

	/**
	 * Number of reviews that the user has created.
	 */
	@Column(name = "number_of_ratings", nullable = false)
	private int numberOfRatings;

	/**
	 * Sum of ratings of the user's own recipes.
	 */
	@Column(name = "sum_of_personal_recipe_ratings", nullable = false)
	private int sumOfPersonalRecipeRatings;

	/**
	 * Number of reviews of the user's own recipes.
	 */
	@Column(name = "number_of_personal_recipe_ratings", nullable = false)
	private int numberOfPersonalRecipeRatings;

	/**
	 * Enabled flag that determines if the user account can be used or not.
	 */
	@Column(name = "ENABLED")
	@NotNull
	private Boolean enabled;

	/**
	 * Date when password was last reset of the user.
	 */
	@Column(name = "LASTPASSWORDRESETDATE")
	@Temporal(TemporalType.TIMESTAMP)
	@NotNull
	private Date lastPasswordResetDate;

	/**
	 * User permissions roles associated with the user.
	 */
	@ManyToMany(fetch = FetchType.EAGER)
	@JoinTable(name = "USER_AUTHORITY", joinColumns = {
			@JoinColumn(name = "USER_ID", referencedColumnName = "user_id") }, inverseJoinColumns = {
					@JoinColumn(name = "AUTHORITY_ID", referencedColumnName = "ID") })
	private List<Authority> authorities;

	/**
	 * Ingredients (brands) that the user has in their inventory.
	 */
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "user_has_brand", joinColumns = {
			@JoinColumn(name = "user_user_id", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "brand_brand_id", nullable = false, updatable = false) })
	private Set<Brand> brands = new HashSet<Brand>(0);

	/**
	 * Recipes created by the user.
	 */
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private Set<Recipe> recipes = new HashSet<Recipe>(0);

	/**
	 * Reviews created by the user.
	 */
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "user")
	private Set<UserRecipeHasReview> userRecipeHasReviews = new HashSet<UserRecipeHasReview>(0);

	/**
	 * Badges of the user.
	 */
	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "user_has_badges", joinColumns = {
			@JoinColumn(name = "user_id", nullable = false, updatable = false) }, inverseJoinColumns = {
					@JoinColumn(name = "badge_id", nullable = false, updatable = false) })
	private Set<Badge> badges = new HashSet<Badge>(0);

	/**
	 * Ratings by the user of reviews.
	 */
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "pk.user")
	private Set<UserRatingReview> userRatingReviews = new HashSet<UserRatingReview>(0);

	/**
	 * Recommendations that the user has received.
	 */
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "recipient")
	private Set<Recommendation> recommendationsReceived = new HashSet<Recommendation>(0);

	/**
	 * Recommendations made by the user.
	 */
	@OneToMany(fetch = FetchType.LAZY, mappedBy = "recommender")
	private Set<Recommendation> recommendationsMade = new HashSet<Recommendation>(0);

	/**
	 * Default empty constructor of a user to suit Jackson's requirement.
	 */
	public User() {

	}

	/**
	 * Constructs an instance of a user.
	 * @param userId the primary key of the user.
	 * @param username the username of the user.
	 * @param sumOfPersonalRecipeRatings the sum of ratings of the user's own recipes.
	 * @param numberOfPersonalRecipeRatings the number of reviews of the user's own recipes.
	 */
	public User(Integer userId, String username, int sumOfPersonalRecipeRatings, int numberOfPersonalRecipeRatings) {
		this.userId = userId;
		this.username = username;
		this.sumOfPersonalRecipeRatings = sumOfPersonalRecipeRatings;
		this.numberOfPersonalRecipeRatings = numberOfPersonalRecipeRatings;
	}

	/**
	 * Constructs an instance of a user.
	 * @param userId the primary key of the user.
	 * @param username the username of the user.
	 * @param password the password of the user.
	 * @param firstName the first name of the user.
	 * @param lastName the last name of the user.
	 * @param email the email of the user.
	 * @param numberOfRecipes the number of recipes that the user has created.
	 * @param numberOfRatings the number of reviews that the user has created.
	 * @param enabled the enabled flag that determines if the user account can be used or not.
	 * @param lastPasswordResetDate the date when password was last reset of the user.
	 * @param authorities the user permissions roles associated with the user.
	 * @param brands the ingredients (brands) that the user has in their inventory.
	 * @param recipes the recipes created by the user.
	 * @param userRecipeHasReviews the reviews created by the user.
	 * @param badges the badges of the user.
	 * @param userRatingReviews the ratings by the user of reviews.
	 * @param sumOfPersonalRecipeRatings the sum of ratings of the user's own recipes.
	 * @param numberOfPersonalRecipeRatings the number of reviews of the user's own recipes.
	 * @param recommendationsReceived the recommendations that the user has received.
	 * @param recommendationsMade the recommendations made by the user.
	 */
	public User(Integer userId, String username, String password, String firstName, String lastName, String email,
			int numberOfRecipes, int numberOfRatings, Boolean enabled, Date lastPasswordResetDate,
			List<Authority> authorities, Set<Brand> brands, Set<Recipe> recipes,
			Set<UserRecipeHasReview> userRecipeHasReviews, Set<Badge> badges, Set<UserRatingReview> userRatingReviews,
			int sumOfPersonalRecipeRatings, int numberOfPersonalRecipeRatings, Set<Recommendation> recommendationsReceived,
			Set<Recommendation> recommendationsMade) {
		this.userId = userId;
		this.username = username;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.email = email;
		this.numberOfRecipes = numberOfRecipes;
		this.numberOfRatings = numberOfRatings;
		this.sumOfPersonalRecipeRatings = sumOfPersonalRecipeRatings;
		this.numberOfPersonalRecipeRatings = numberOfPersonalRecipeRatings;
		this.enabled = enabled;
		this.lastPasswordResetDate = lastPasswordResetDate;
		this.authorities = authorities;
		this.brands = brands;
		this.recipes = recipes;
		this.userRecipeHasReviews = userRecipeHasReviews;
		this.badges = badges;
		this.userRatingReviews = userRatingReviews;
		this.recommendationsReceived = recommendationsReceived;
		this.recommendationsMade = recommendationsMade;
	}

	/**
	 * Standard getter method that returns the primary key of the user.
	 * @return the primary key of the user.
	 */
	public Integer getUserId() {
		return userId;
	}

	/**
	 * Standard setter method that sets the primary key for the user.
	 * @param userId the primary key to set for the user.
	 */
	public void setUserId(Integer userId) {
		this.userId = userId;
	}

	/**
	 * Standard getter method that returns the username of the user.
	 * @return the username of the user.
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * Standard setter method that sets the username for the user.
	 * @param username the username to set for the user.
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * Standard getter method that returns the password of the user.
	 * @return the password of the user.
	 */
	public String getPassword() {
		return password;
	}

	/**
	 * Standard setter method that sets the password for the user.
	 * @param password the password to set for the user.
	 */
	public void setPassword(String password) {
		this.password = password;
	}

	/**
	 * Standard getter method that returns the first name of the user.
	 * @return the first name of the user.
	 */
	public String getFirstName() {
		return firstName;
	}

	/**
	 * Standard setter method that sets the first name for the user.
	 * @param firstName the first name to set for the user.
	 */
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}

	/**
	 * Standard getter method that returns the last name of the user.
	 * @return the last name of the user.
	 */
	public String getLastName() {
		return lastName;
	}

	/**
	 * Standard setter method that sets the last name for the user.
	 * @param lastName the last name to set for the user.
	 */
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	/**
	 * Standard getter method that returns the email of the user.
	 * @return the email of the user.
	 */
	public String getEmail() {
		return email;
	}

	/**
	 * Standard setter method that sets the email for the user.
	 * @param email the email to set for the user.
	 */
	public void setEmail(String email) {
		this.email = email;
	}

	/**
	 * Standard getter method that returns the number of recipes that the user has created.
	 * @return the number of recipes that the user has created.
	 */
	public int getNumberOfRecipes() {
		return numberOfRecipes;
	}

	/**
	 * Standard setter method that sets the number of recipes that the user has created for the user.
	 * @param numberOfRecipes the number of recipes that the user has created to set for the user.
	 */
	public void setNumberOfRecipes(int numberOfRecipes) {
		this.numberOfRecipes = numberOfRecipes;
	}

	/**
	 * Standard getter method that returns the number of reviews that the user has created.
	 * @return the number of reviews that the user has created.
	 */
	public int getNumberOfRatings() {
		return numberOfRatings;
	}

	/**
	 * Standard setter method that sets the number of reviews that the user has created for the user.
	 * @param numberOfRatings the number of reviews that the user has created to set for the user.
	 */
	public void setNumberOfRatings(int numberOfRatings) {
		this.numberOfRatings = numberOfRatings;
	}

	/**
	 * Standard getter method that returns the sum of ratings of the user's own recipes.
	 * @return the sum of ratings of the user's own recipes.
	 */
	public int getSumOfPersonalRecipeRatings() {
		return sumOfPersonalRecipeRatings;
	}

	/**
	 * Standard setter method that sets the sum of ratings of the user's own recipes for the user.
	 * @param sumOfPersonalRecipeRatings the sum of ratings of the user's own recipes to set for the user.
	 */
	public void setSumOfPersonalRecipeRatings(int sumOfPersonalRecipeRatings) {
		this.sumOfPersonalRecipeRatings = sumOfPersonalRecipeRatings;
	}

	/**
	 * Standard getter method that returns the number of reviews of the user's own recipes.
	 * @return the number of reviews of the user's own recipes.
	 */
	public int getNumberOfPersonalRecipeRatings() {
		return numberOfPersonalRecipeRatings;
	}

	/**
	 * Standard setter method that sets the number of reviews of the user's own recipes for the user.
	 * @param numberOfPersonalRecipeRatings the number of reviews of the user's own recipes to set for the user.
	 */
	public void setNumberOfPersonalRecipeRatings(int numberOfPersonalRecipeRatings) {
		this.numberOfPersonalRecipeRatings = numberOfPersonalRecipeRatings;
	}

	/**
	 * Standard getter method that returns the enabled flag that determines if a user account can be used or not.
	 * @return the enabled flag that determines if a user account can be used or not.
	 */
	public Boolean getEnabled() {
		return enabled;
	}

	/**
	 * Standard setter method that sets the enabled flag that determines if a user account can be used or not for the user.
	 * @param enabled the enabled flag that determines if a user account can be used or not to set for the user.
	 */
	public void setEnabled(Boolean enabled) {
		this.enabled = enabled;
	}

	/**
	 * Standard getter method that returns the user permissions roles associated with the user.
	 * @return the user permissions roles associated with the user.
	 */
	public List<Authority> getAuthorities() {
		return authorities;
	}

	/**
	 * Standard setter method that sets the user permissions roles for the user.
	 * @param authorities the user permissions roles to set for the user.
	 */
	public void setAuthorities(List<Authority> authorities) {
		this.authorities = authorities;
	}

	/**
	 * Standard getter method that returns the date when password was last reset of the user.
	 * @return the date when password was last reset of the user.
	 */
	public Date getLastPasswordResetDate() {
		return lastPasswordResetDate;
	}

	/**
	 * Standard setter method that sets the date when password was last reset for the user.
	 * @param lastPasswordResetDate the date when password was last reset to set for the user.
	 */
	public void setLastPasswordResetDate(Date lastPasswordResetDate) {
		this.lastPasswordResetDate = lastPasswordResetDate;
	}

	/**
	 * Standard getter method that returns the ingredients (brands) that the user has in their inventory.
	 * @return the ingredients (brands) that the user has in their inventory.
	 */
	public Set<Brand> getBrands() {
		return brands;
	}

	/**
	 * Standard setter method that sets the ingredients (brands) that the user has in their inventory for the user.
	 * @param brands the ingredients (brands) that the user has in their inventory to set for the user.
	 */
	public void setBrands(Set<Brand> brands) {
		this.brands = brands;
	}

	/**
	 * Standard getter method that returns the recipes created by the user.
	 * @return the recipes created by the user.
	 */
	public Set<Recipe> getRecipes() {
		return recipes;
	}

	/**
	 * Standard setter method that sets the recipes created by the user for the user.
	 * @param recipes the recipes created by the user to set for the user.
	 */
	public void setRecipes(Set<Recipe> recipes) {
		this.recipes = recipes;
	}

	/**
	 * Standard getter method that returns the reviews created by the user.
	 * @return the reviews created by the user.
	 */
	public Set<UserRecipeHasReview> getUserRecipeHasReviews() {
		return userRecipeHasReviews;
	}

	/**
	 * Standard setter method that sets the reviews created by the user for the user.
	 * @param userRecipeHasReviews the reviews created by the user to set for the user.
	 */
	public void setUserRecipeHasReviews(Set<UserRecipeHasReview> userRecipeHasReviews) {
		this.userRecipeHasReviews = userRecipeHasReviews;
	}

	/**
	 * Standard getter method that returns the badges of the user.
	 * @return the badges of the user.
	 */
	public Set<Badge> getBadges() {
		return badges;
	}

	/**
	 * Standard setter method that sets the badges of the user for the user.
	 * @param badges the badges of the user to set for the user.
	 */
	public void setBadges(Set<Badge> badges) {
		this.badges = badges;
	}

	/**
	 * Standard getter method that returns the ratings by the user of reviews.
	 * @return the ratings by the user of reviews.
	 */
	public Set<UserRatingReview> getUserRatingReviews() {
		return userRatingReviews;
	}

	/**
	 * Standard setter method that sets the ratings by the user of reviews for the user.
	 * @param userRatingReviews the ratings by the user of reviews to set for the user.
	 */
	public void setUserRatingReviews(Set<UserRatingReview> userRatingReviews) {
		this.userRatingReviews = userRatingReviews;
	}

	/**
	 * Standard getter method that returns the recommendations that the user has received.
	 * @return the recommendations that the user has received.
	 */
	public Set<Recommendation> getRecommendationsReceived() {
		return recommendationsReceived;
	}

	/**
	 * Standard setter method that sets the recommendations that the user has received for the user.
	 * @param recommendationsReceived the recommendations that the user has received to set for the user.
	 */
	public void setRecommendationsReceived(Set<Recommendation> recommendationsReceived) {
		this.recommendationsReceived = recommendationsReceived;
	}

	/**
	 * Standard getter method that returns the recommendations made by the user.
	 * @return the recommendations made by the user.
	 */
	public Set<Recommendation> getRecommendationsMade() {
		return recommendationsMade;
	}

	/**
	 * Standard setter method that sets the recommendations made by the user for the user.
	 * @param recommendationsMade the recommendations made by the user to set for the user.
	 */
	public void setRecommendationsMade(Set<Recommendation> recommendationsMade) {
		this.recommendationsMade = recommendationsMade;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((userId == null) ? 0 : userId.hashCode());
		result = prime * result + ((username == null) ? 0 : username.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (!(obj instanceof User))
			return false;
		User other = (User) obj;
		if (userId == null) {
			if (other.userId != null)
				return false;
		} else if (!userId.equals(other.userId))
			return false;
		if (username == null) {
			if (other.username != null)
				return false;
		} else if (!username.equals(other.username))
			return false;
		return true;
	}

	@Override
	public String toString() {
		return "User [userId=" + userId + ", firstName=" + firstName + ", lastName=" + lastName + ", email="
				+ email + "]";
	}

}
