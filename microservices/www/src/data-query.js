var DataQuery = function () {
    var me = this;
    /* ----------- course related queries -------------*/

    //To select course details
    me.fetchCourseDetails = function (user_id, course_id) {
        var query = {
            "type": "select",
            "args": {
                "table": "course_details",
                "columns": ["course_id", "name", "about", "syllabus", "course_logo",
                    {
                        "name": "user_course_status",
                        "columns": ["status"],
                        "where": {
                            "user_id": user_id
                        }
                    }
                ],
                "where": {
                    "$and": [{
                            "course_id": course_id
                        },
                        {
                            "active": true
                        }
                    ]
                }

            }
        };
        return query;
    };
    //To insert course status
    me.insertCourseStatus = function (user_id, course_id) {
        var query = {
            "type": "insert",
            "args": {
                "table": "course_status",
                "objects": [{
                    "user_id": user_id,
                    "course_id": course_id
                }]
            }
        };
        return query;
    };
    //To fetch course status
    me.fetchCourseStatus = function (user_id, course_id) {
        var query = {
            "type": "select",
            "args": {
                "table": "module_details",
                "columns": [{
                    "name": "module_topics",
                    "columns": ["topic_id"]
                }, {
                    "name": "user_topic_status",
                    "columns": ["topic_id"],
                    "where": {
                        "user_id": user_id
                    }
                }],
                "where": {
                    "course_id": course_id
                }
            }
        };
        return query;
    };
    //To update course status
    me.updateCourseStatus = function (user_id, course_id) {
        var query = {
            "type": "update",
            "args": {
                "table": "course_status",
                "$set": {
                    "status": true
                },
                "where": {
                    "$and": [{
                            "user_id": user_id
                        },
                        {
                            "course_id": course_id
                        }
                    ]
                }
            }
        };
        return query;
    };

    /* ----------- user related queries -------------*/

    //To insert user Full Name
    me.insertFullName = function (user_id, name) {
        var query = {
            "type": "insert",
            "args": {
                "table": "user_other_details",
                "objects": [{
                    "user_id": user_id,
                    "name": name
                }]
            }
        };
        return query;
    };
    //To select user points
    me.fetchUserPoints = function (user_id) {
        var query = {
            "type": "select",
            "args": {
                "table": "user_other_details",
                "columns": ["points"],
                "where": {
                    "user_id": user_id
                }
            }
        };
        return query;
    };
    //To update user points
    me.updateUserPoints = function (user_id, topic_points) {
        var query = {
            "type": "update",
            "args": {
                "table": "user_other_details",
                "$inc": {
                    "points": topic_points
                },
                "where": {
                    "user_id": user_id
                }
            }
        };
        return query;
    };
    //To select badge details
    me.fetchBadgeDetails = function (user_id, points) {
        var query = {
            "type": "select",
            "args": {
                "table": "badge_details",
                "columns": [
                    "badge_id", "name", "points", "badge_logo", "badge_description",
                    {
                        "name": "user_badge_status",
                        "columns": ["display_status"],
                        "where": {
                            "user_id": user_id
                        }
                    }
                ],
                "where": {
                    "points": {
                        "$lte": points
                    }
                },
                "order_by": "-points"
            }
        };
        return query;
    };
    //To insert user badges
    me.insertUserBadge = function (badgeArray) {
        var query = {
            "type": "insert",
            "args": {
                "table": "badge_status",
                "objects": badgeArray
            }
        };
        return query;
    };

    /* ----------- topic related queries -------------*/

    //To fetch topic points
    me.fetchTopicPoints = function (topic_id) {
        var query = {
            "type": "select",
            "args": {
                "table": "topic_details",
                "columns": ["topic_points"],
                "where": {
                    "topic_id": topic_id
                }
            }
        };
        return query;
    };
    //To insert topic status
    me.insertTopicStatus = function (user_id, topic_id, topic_points, module_id) {
        var query = {
            "type": "insert",
            "args": {
                "table": "topic_status",
                "objects": [{
                    "user_id": user_id,
                    "topic_id": topic_id,
                    "topic_points": topic_points,
                    "module_id": module_id
                }]
            }
        };
        return query;
    };
};

module.exports = DataQuery;